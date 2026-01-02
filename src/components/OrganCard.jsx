const OrganCard = ({ icon, name, count, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow hover:-translate-y-1 transition cursor-pointer"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold">{name}</h3>

      <span className="inline-block mt-2 bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
        {count} disease{count !== 1 && "s"}
      </span>
    </div>
  );
};

export default OrganCard;
