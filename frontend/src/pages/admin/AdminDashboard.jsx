// import AdminLayout from "../../components/admin/AdminLayout";
// import useApi from "../../hooks/useApi";
// import { Briefcase, FileText, MessageSquare, Users } from "lucide-react";

// export default function AdminDashboard() {
//   // Real-time data fetching
//   const { data: services } = useApi("/services");
//   const { data: blogs } = useApi("/blogs");
//   const { data: contacts } = useApi("/contacts");

//   const stats = [
//     { title: "Services", value: services?.length || 0, icon: Briefcase, color: "text-blue-500" },
//     { title: "Blogs", value: blogs?.length || 0, icon: FileText, color: "text-orange-500" },
//     { title: "Inquiries", value: contacts?.length || 0, icon: MessageSquare, color: "text-purple-500" },
//     { title: "Team", value: "4", icon: Users, color: "text-green-500" },
//   ];

//   return (
//     <AdminLayout>
//       <div className="mb-12">
//         <h1 className="text-4xl font-black italic uppercase">Command <span className="text-accent">Center</span></h1>
//         <p className="text-muted mt-2 font-medium italic underline decoration-accent/30 underline-offset-4">Performance metrics for Codecelix Ecosystem</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, i) => (
//           <div key={i} className="glass border border-line p-8 rounded-4xl bg-surface/30 group hover:border-accent transition-all">
//             <div className={`mb-4 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 ${stat.color}`}>
//               <stat.icon size={24} />
//             </div>
//             <p className="text-muted text-sm font-bold uppercase tracking-widest">{stat.title}</p>
//             <h2 className="text-4xl font-black mt-2">{stat.value}</h2>
//           </div>
//         ))}
//       </div>

//       {/* Recent Inquiries Quick View */}
//       <div className="mt-12 glass border border-line rounded-4xl p-8 bg-surface/20">
//         <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
//           <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
//           Recent Inbound Leads
//         </h3>
//         <div className="space-y-4">
//           {contacts?.slice(0, 3).map((c, i) => (
//             <div key={i} className="p-4 border border-line rounded-2xl bg-bg/40 flex justify-between items-center">
//               <div>
//                 <p className="font-bold">{c.name}</p>
//                 <p className="text-xs text-muted">{c.email}</p>
//               </div>
//               <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-bold uppercase italic">New</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

import AdminLayout from '../../components/admin/AdminLayout'
import useApi from '../../hooks/useApi'
import { Briefcase, FileText, MessageSquare, Users } from 'lucide-react'

export default function AdminDashboard() {
  const { data: services } = useApi('/services')
  const { data: blogs } = useApi('/blogs')
  const { data: contacts } = useApi('/contact')

  const stats = [
    {
      title: 'Services',
      value: services?.length || 0,
      icon: Briefcase,
      color: 'text-blue-500'
    },
    {
      title: 'Blogs',
      value: blogs?.length || 0,
      icon: FileText,
      color: 'text-orange-500'
    },
    {
      title: 'Inquiries',
      value: contacts?.length || 0,
      icon: MessageSquare,
      color: 'text-purple-500'
    },
    {
      title: 'Team',
      value: '4',
      icon: Users,
      color: 'text-green-500'
    }
  ]

  return (
    <AdminLayout>
      <div className="mb-12">
        <h1 className="text-4xl font-black italic uppercase">
          Command <span className="text-accent">Center</span>
        </h1>
        <p className="text-muted mt-2 font-medium italic underline decoration-accent/30 underline-offset-4">
          Performance metrics for Codecelix Ecosystem
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="glass border border-line p-8 rounded-4xl bg-surface/30 group hover:border-accent transition-all"
          >
            <div
              className={`mb-4 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 ${stat.color}`}
            >
              <stat.icon size={24} />
            </div>
            <p className="text-muted text-sm font-bold uppercase tracking-widest">
              {stat.title}
            </p>
            <h2 className="text-4xl font-black mt-2">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="mt-12 glass border border-line rounded-4xl p-8 bg-surface/20">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
          Recent Inbound Leads
        </h3>

        <div className="space-y-4">
          {contacts?.slice(0, 3).map((c, i) => (
            <div
              key={i}
              className="p-4 border border-line rounded-2xl bg-bg/40 flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{c.name}</p>
                <p className="text-xs text-muted">{c.email}</p>
              </div>
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-bold uppercase italic">
                New
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
