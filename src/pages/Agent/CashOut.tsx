import cashOutIcon from "@/assets/Icons/cash-out.png";
import TransactionForm from "@/components/modules/Transaction/TransactionForm";
import { useCashOutMutation } from "@/redux/features/agent/agent.api";
import { useCurrentUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CashOut = () => {
  const [cashOut, {isLoading}] = useCashOutMutation();

  const { data } = useCurrentUserInfoQuery(undefined);

  const role = data?.data?.role;
  const status = data?.data?.status;

  const navigate = useNavigate();

  // Add money Request Handler
  const handleCashOut = async (cashOutData: {
    phone: string;
    amount: number;
  }) => {
    const toastId = toast.loading("Processing Cash Out...");

    const cashOutPayload = {
      userPhone: cashOutData.phone,
      amount: cashOutData.amount,
    };

    console.log("Cash Out:", cashOutPayload);

    try {
      const res = await cashOut(cashOutPayload).unwrap();
      console.log("Cash Out Response:", res);

      if (res.success) {
        navigate("/agent/wallet");
        toast.success("Money Cashed Out From User Wallet successfully!", {
          id: toastId,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.statusCode);
      if (error.status >= 400 && error.status < 500) {
        return toast.error(error.data.message, { id: toastId });
      }

      return toast.error("Failed To Cash Out Money", { id: toastId });
    }
  };

  return (
    <TransactionForm
      role={role}
      status={status}
      isLoading={isLoading}
      type="cash-out"
      title="Cash Out"
      description="Cash Out From User Wallet"
      buttonText="Cash Out"
      icon={cashOutIcon}
      gradientClass="from-emerald-500 to-teal-600"
      onSubmit={handleCashOut}
    />
  );
};

export default CashOut;
