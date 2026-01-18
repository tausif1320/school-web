import { Student } from "@/context/SchoolContext";

type Props = {
  student: Student | null;
  onClose: () => void;
};

export default function CollectFeeModal({ student, onClose }: Props) {
  if (!student) return null;

  const due = student.totalFees - student.paidFees;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-semibold">Collect Fee</h2>

        <div className="text-sm text-gray-400 space-y-1">
          <p>Name: {student.name}</p>
          <p>Class: {student.class}</p>
          <p>Due Amount: ₹{due}</p>
        </div>

        <input
          placeholder="Enter amount"
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 outline-none"
        />

        <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2">
          <option>Payment Method</option>
          <option>Cash</option>
          <option>UPI</option>
          <option>Bank Transfer</option>
        </select>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-white text-black rounded-xl">
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}
