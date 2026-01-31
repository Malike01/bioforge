from typing import List, Dict
from Bio.Seq import Seq # Biopython
from app.schemas.design import (
    DesignValidationRequest, 
    ValidationResponse, 
    ValidationMessage, 
    BioType,
    DesignNode
)

class BioValidator:
    def __init__(self):
        self.grammar_rules = {
            BioType.PROMOTER: [BioType.RBS],     # Promoter -> RBS
            BioType.RBS: [BioType.CDS],          # RBS -> CDS
            BioType.CDS: [BioType.TERMINATOR, BioType.CDS], # CDS -> Terminator or Linker/CDS
            BioType.TERMINATOR: [BioType.PROMOTER, None] # Terminator -> Promoter or End
        }

    def validate(self, design: DesignValidationRequest) -> ValidationResponse:
        messages = []
        
        # 1. Convert Graph to Linear Array (Sorting)
        try:
            sorted_nodes = self._sort_graph(design.nodes, design.edges)
        except Exception as e:
            return ValidationResponse(is_valid=False, messages=[
                ValidationMessage(message=f"Structural Error: {str(e)}", severity="error")
            ])

        # 2. Check the rules
        if not sorted_nodes:
            return ValidationResponse(is_valid=True, messages=[
                ValidationMessage(message="Canvas is empty.", severity="info")
            ])

        # Rules A: First Node gotta be Promoter
        if sorted_nodes[0].data.type != BioType.PROMOTER:
             messages.append(ValidationMessage(
                node_id=sorted_nodes[0].id,
                message="Genetic circuit should typically start with a Promoter.",
                severity="warning"
            ))

        # Rules B: Node order control (Grammar Check)
        full_sequence = ""
        for i in range(len(sorted_nodes)):
            current_node = sorted_nodes[i]
            current_type = current_node.data.type
            
            # Sequence Assembly (DNA Splicing)
            if current_node.data.sequence:
                # DNA validation with Biopython
                clean_seq = self._validate_dna_sequence(current_node.data.sequence)
                if not clean_seq:
                     messages.append(ValidationMessage(
                        node_id=current_node.id,
                        message="Invalid DNA characters found (Only A,T,G,C allowed).",
                        severity="error"
                    ))
                full_sequence += clean_seq or ""

            # Check the next node
            if i < len(sorted_nodes) - 1:
                next_node = sorted_nodes[i+1]
                next_type = next_node.data.type
                
                allowed_next = self.grammar_rules.get(current_type, [])
                if next_type not in allowed_next:
                    messages.append(ValidationMessage(
                        node_id=current_node.id,
                        message=f"A {current_type.name} cannot be followed by a {next_type.name}.",
                        severity="error"
                    ))

        # Are there any errors
        has_errors = any(m.severity == "error" for m in messages)
        
        return ValidationResponse(
            is_valid=not has_errors,
            messages=messages,
            compiled_sequence=full_sequence if not has_errors else None
        )

    def _sort_graph(self, nodes: List[DesignNode], edges: List[Dict]) -> List[DesignNode]:
        """
        It arranges the nodes coming from React Flow according to their connection order.
        It uses a simple 'Linked List' logic.
        """
        if not nodes:
            return []
            
        node_map = {node.id: node for node in nodes}
        # Edge the map: source_id -> target_id
        connections = {edge.source: edge.target for edge in edges}
        # List of target audiences (to find the starting point)
        targets = set(edge.target for edge in edges)
        
        # Find the starting node (the node that has no arrow target)
        start_node_ids = [n.id for n in nodes if n.id not in targets]
        
        if len(start_node_ids) == 0 and len(nodes) > 0:
            raise ValueError("Cycle detected or invalid loop. Circuit must have a start.")
        if len(start_node_ids) > 1:
            # For now, let's just allow a single circuit (MVP)
            pass 

        sorted_list = []
        current_id = start_node_ids[0]
        
        while current_id:
            if current_id in node_map:
                sorted_list.append(node_map[current_id])
            
            # go to next
            current_id = connections.get(current_id)
            
            # Infinite loop protection (Simple)
            if len(sorted_list) > len(nodes):
                raise ValueError("Infinite loop detected in design.")
                
        return sorted_list

    def _validate_dna_sequence(self, raw_seq: str) -> str:
        """It performs DNA cleaning using Biopython."""
        if not raw_seq: return ""
        # Remove spaces and new lines.
        clean = "".join(raw_seq.split()).upper()
        # Only valid letters?
        seq_obj = Seq(clean)
        # Simple validation in BioPython.
        valid_chars = set("ATGCUKN") # N = Any, U = Uracil (RNA)
        if not set(clean).issubset(valid_chars):
            return None
        return clean