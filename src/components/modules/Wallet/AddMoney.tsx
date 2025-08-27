import addMoneyIcon from "@/assets/Icons/add-money.png";
import TransactionForm from "@/components/modules/Transaction/TransactionForm";
import { useCurrentUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useAddMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const AddMoney = () => {
  const [addMoney] = useAddMoneyMutation();
  const navigate = useNavigate();

  const { data: userData } = useCurrentUserInfoQuery(undefined);
  const userRole = userData?.data?.role;
  const walletPath = `/${userRole?.toLowerCase()}/wallet`;

   // Add money Request Handler
  const handleAddMoney = async (addMoneyData: {
    phone: string;
    amount: number;
  }) => {
    const toastId = toast.loading("Adding Money...");

    const addMoneyPayload = {
      agentPhone: addMoneyData.phone,
      amount: addMoneyData.amount,
    };

    try {
      const res = await addMoney(addMoneyPayload).unwrap();
      console.log("Add Money Response:", res);

      if (res.success) {
        navigate(walletPath);
        toast.success("Money Added To Your Wallet successfully!", {
          id: toastId,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status >= 400 && error.status < 500) {
        return toast.error(error.data.message, { id: toastId });
      }

      return toast.error("Failed To Add Money", { id: toastId });
    }
  };

  return (
    <>
      <TransactionForm
        type="add-money"
        title="Add Money"
        description="Top up your own wallet instantly"
        buttonText="Add Money"
        icon={addMoneyIcon}
        gradientClass="from-emerald-500 to-teal-600"
        onSubmit={handleAddMoney}
      />
    </>
  );
};

export default AddMoney;
