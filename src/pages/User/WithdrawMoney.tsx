import withdrawMoneyIcon from "@/assets/Icons/withdraw-money.png";
import TransactionForm from "@/components/modules/Transaction/TransactionForm";

const WithdrawMoney = () => {
  const handleWithdrawMoney = (data: {
    phoneNumber: string;
    amount: number;
  }) => {
    console.log("Withdraw Money:", data);
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
