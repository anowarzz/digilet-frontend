import cashInIcon from "@/assets/Icons/cash-in.png";
import TransactionForm from "@/components/modules/Transaction/TransactionForm";
import { useCashInMutation } from "@/redux/features/agent/agent.api";
import { useCurrentUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CashIn = () => {
  const [cashIn, { isLoading }] = useCashInMutation();
  const { data } = useCurrentUserInfoQuery(undefined);

  const role = data?.data?.role;
  const status = data?.data?.status;

  const navigate = useNavigate();

  // Add money Request Handler
  const handleCashIn = async (cashInData: {
    phone: string;
    amount: number;
  }) => {
    const toastId = toast.loading("Processing Cash In...");

    const cashInPayload = {
      userPhone: cashInData.phone,
      amount: cashInData.amount,
    };

    console.log("Cash In:", cashInPayload);

    try {
      const res = await cashIn(cashInPayload).unwrap();
      console.log("Cash In Response:", res);

      if (res.success) {
        navigate("/agent/wallet");
        toast.success("Money Cashed In To User Wallet successfully!", {
          id: toastId,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.statusCode);
      if (error.status >= 400 && error.status < 500) {
        return toast.error(error.data.message, { id: toastId });
      }

      return toast.error("Failed To Cash In Money", { id: toastId });
    }
  };

  return (
    <TransactionForm
      type="cash-in"
      title="Cash In"
      role={role}
      isLoading={isLoading}
      status={status}
      description="Cash In To User Wallet"
      buttonText="Cash In"
      icon={cashInIcon}
      gradientClass="from-emerald-500 to-teal-600"
      onSubmit={handleCashIn}
    />
  );
};

export default CashIn;
