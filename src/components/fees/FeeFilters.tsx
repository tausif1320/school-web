type Props = {
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  classFilter: string;
  setClassFilter: (v: string) => void;
};

export default function FeeFilters({
  search,
  setSearch,
  status,
  setStatus,
  classFilter,
  setClassFilter,
}: Props) {
  return (
    <div className="glass p-4 flex flex-wrap gap-4 items-center">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search name or admission no..."
        className="bg-transparent border border-white/10 rounded-xl px-4 py-2 outline-none w-full md:w-64 placeholder:opacity-50"
      />

      <select
        value={classFilter}
        onChange={(e) => setClassFilter(e.target.value)}
        className="bg-[#050B14] border border-white/10 rounded-xl px-4 py-2 outline-none"
      >
        <option value="all">All Classes</option>
        <option value="10A">10A</option>
        <option value="9B">9B</option>
        <option value="8C">8C</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-[#050B14] border border-white/10 rounded-xl px-4 py-2 outline-none"
      >
        <option value="all">All Status</option>
        <option value="paid">Paid</option>
        <option value="partial">Partial</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
}
