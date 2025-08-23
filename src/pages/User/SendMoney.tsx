import sendMoneyIcon from "@/assets/Icons/send-money.png";
import TransactionForm from "@/components/modules/Transaction/TransactionForm";

const SendMoney = () => {
  const handleSendMoney = (data: { phoneNumber: string; amount: number }) => {
    console.log("Send Money:", data);
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
      isLoading={false} 
    />
  );
};

export default SendMoney;
