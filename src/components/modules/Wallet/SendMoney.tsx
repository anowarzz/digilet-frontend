import sendMoneyIcon from "@/assets/Icons/send-money.png";
import TransactionForm from "@/components/modules/Transaction/TransactionForm";
import { useCurrentUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useSendMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const SendMoney = () => {
  const navigate = useNavigate();
  const [sendMoney] = useSendMoneyMutation();

  const { data: userData } = useCurrentUserInfoQuery(undefined);
  const userRole = userData?.data?.role;
  const walletPath = `/${userRole?.toLowerCase()}/wallet`;

  // Send Money Request Handler
  const handleSendMoney = async (sendMoneyData: {
    phone: string;
    amount: number;
  }) => {
    const toastId = toast.loading("Sending Money...");

    const sendMoneyPayload = {
      receiverPhone: sendMoneyData.phone,
      amount: sendMoneyData.amount,
    };

    try {
      const res = await sendMoney(sendMoneyPayload).unwrap();
      console.log("Send Money Response:", res);

      if (res.success) {
        navigate(walletPath);
        toast.success("Money Sent Successfully!", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status >= 400 && error.status < 500) {
        return toast.error(error.data.message, { id: toastId });
      }

      return toast.error("Failed To Send Money", { id: toastId });
    }
  };

  return (
    <TransactionForm
      type="send-money"
      title="Send Money"
      description="Transfer money to others instantly"
      buttonText="Send Money"
      icon={sendMoneyIcon}
      gradientClass="from-fuchsia-500 to-purple-600"
      onSubmit={handleSendMoney}
    />
  );
};

export default SendMoney;
