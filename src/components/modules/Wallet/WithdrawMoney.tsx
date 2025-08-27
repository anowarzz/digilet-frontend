import withdrawMoneyIcon from "@/assets/Icons/withdraw-money.png";
import TransactionForm from "@/components/modules/Transaction/TransactionForm";
import { useCurrentUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useWithdrawMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const WithdrawMoney = () => {
  const navigate = useNavigate();
  const [withdrawMoney] = useWithdrawMoneyMutation();

  const { data: userData } = useCurrentUserInfoQuery(undefined);
  const userRole = userData?.data?.role;
  const walletPath = `/${userRole?.toLowerCase()}/wallet`;

  // Money withdraw request Handler
  const handleWithdrawMoney = async (withdrawMoneyData: {
    phone: string;
    amount: number;
  }) => {
    const toastId = toast.loading("Withdrawing Money...");

    const withdrawMoneyPayload = {
      agentPhone: withdrawMoneyData.phone,
      amount: withdrawMoneyData.amount,
    };


    try {
      const res = await withdrawMoney(withdrawMoneyPayload).unwrap();
      console.log("Withdraw Money Response:", res);

      if (res.success) {
        navigate(walletPath);
        toast.success("Money Withdrawn Successfully!", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status >= 400 && error.status < 500) {
        return toast.error(error.data.message, { id: toastId });
      }

      return toast.error("Failed To Withdraw Money", { id: toastId });
    }
  };

  return (
    <TransactionForm
      type="withdraw-money"
      title="Withdraw Money"
      description="Withdraw Money To Agent Wallet"
      buttonText="Withdraw Money"
      icon={withdrawMoneyIcon}
      gradientClass="from-pink-500 to-rose-600"
      onSubmit={handleWithdrawMoney}
    />
  );
};

export default WithdrawMoney;
