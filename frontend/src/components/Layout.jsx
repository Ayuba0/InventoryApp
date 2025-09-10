import { Outlet, Link } from "react-router-dom";

function Layout(){
    return(

        <div className="flex h-screen" >
            {/* Sidebar */}

            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Inventory App</h2>
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        <li><Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700"> Dashbord</Link></li>
                        <li><Link to="/products" className="block p-2 rounded hover:bg-gray-700">Products</Link></li>
                        <li><Link to="/sales" className="block p-2 rounded hover:bg-gray-700">Sales</Link></li>
                        <li><Link to="/report" className="block p-2 rounded hover:bg-gray-700">Report</Link></li>

                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                <header className="flex justify-between items-center bg-white p-4 shadow rounded mb-6">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <button className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
                </header>
                <Outlet />
            </main>
        </div>
    )

}

export default Layout;