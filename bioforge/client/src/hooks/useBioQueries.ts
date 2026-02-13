import type { BioServiceError } from "@api/api";
import { bioApi } from "@api/bioClient";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Hook 1
export const useBioParts = () => {
  return useQuery({
    queryKey: ["bio-parts"],
    queryFn: bioApi.getParts,
    meta: {
      errorMessage: "Failed to load biological parts library.",
    },
  });
};

// Hook 2
export const useValidateDesign = () => {
  return useMutation({
    mutationFn: bioApi.validateDesign,

    onMutate: () => {
      toast.loading("Validating design...", { id: "validate-design" });
    },

    onSuccess: (data) => {
      toast.success("Design Validated", {
        description: "Your genetic circuit is biologically viable.",
        duration: 4000,
        action: {
          label: "Simulate",
          onClick: () => console.log("Simulating design..."),
        },
      });

      if (data.warnings && data.warnings.length > 0) {
        toast.warning("Optimization Needed", {
          description: `${data.warnings.length} non-critical warnings found.`,
        });
      }
    },

    onError: (error: BioServiceError) => {
      if (error.code === "BIO_VALIDATION_ERROR") {
        toast.error("Validation Failed", {
          description: error.message,
          duration: 6000,
          cancel: {
            label: "Details",
            onClick: () => console.log(error.details),
          },
        });
      } else if (error.code === "NETWORK_ERROR") {
        toast.error("Connection Error", {
          description: "Could not reach Bio-Engine. Is Docker running?",
        });
      } else {
        toast.error("System Error", {
          description: "An unexpected error occurred. Please try again.",
        });
      }
    },
  });
};
