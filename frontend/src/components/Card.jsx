function Card({ title, value, icon }) {
    return (
      <div className="bg-white rounded shadow p-6 flex items-center space-x-4 hover:shadow-lg transition">
        <div className="text-3xl">{icon}</div>
        <div>
          <p className="text-gray-500">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    );
  }
  
  export default Card;
  