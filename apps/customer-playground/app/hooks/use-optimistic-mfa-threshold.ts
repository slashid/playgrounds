import { ROOT_ROUTE_ID, UPDATE_MFA_THRESHOLD_API_PATH } from "~/domain/paths";
import { DEFAULT_MFA_THRESHOLD } from "~/domain/user/constants";
import type { MfaThreshold, MfaThresholdLoaderData } from "~/domain/user/types";
import { useRouteLoaderData } from "~/hooks/use-route-loader-data";
import { useOptimisticFormFieldValue } from "./use-optimistic-form-field-value";

/**
 * This hook returns the optimistic cart items that are currently either being submitted/loaded to/from the server.
 */
export const useOptimisticMfaThreshold = () => {
  const { mfaThreshold } =
    useRouteLoaderData<MfaThresholdLoaderData>(ROOT_ROUTE_ID);
  const submittedMfaThreshold = useOptimisticFormFieldValue<MfaThreshold>(
    "mfaThreshold",
    UPDATE_MFA_THRESHOLD_API_PATH
  );

  const optimisticMfaThreshold =
    submittedMfaThreshold || mfaThreshold || DEFAULT_MFA_THRESHOLD;

  return optimisticMfaThreshold;
};
