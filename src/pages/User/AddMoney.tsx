import addMoneyIcon from "@/assets/Icons/add-money.png";
import TransactionForm from "@/components/modules/Transaction/TransactionForm";

const AddMoney = () => {
  const handleAddMoney = (data: { phoneNumber: string; amount: number }) => {
    console.log("Add Money:", data);
  }; 

  return (
    <TransactionForm
      type="add-money"
      title="Add Money"
      description="Top up your wallet instantly"
      buttonText="Add Money"
      icon={addMoneyIcon}
      gradientClass="from-emerald-500 to-teal-600"
      onSubmit={handleAddMoney}
      isLoading={false}
    />
  );
};

export default AddMoney;
