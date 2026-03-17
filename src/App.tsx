/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  CheckSquare, 
  Trophy, 
  User, 
  Plus, 
  Bell, 
  Star, 
  Moon, 
  BookOpen, 
  Gamepad2, 
  ArrowLeft, 
  Camera, 
  Info,
  CheckCircle2,
  Mail,
  Lock,
  Settings,
  Eye,
  Check,
  Rocket,
  Leaf,
  Sparkles,
  Award
} from 'lucide-react';
import { UserRole, Task, Child, Activity, Achievement } from './types';

// Mock Data
const MOCK_CHILD: Child = {
  id: 'lucas-1',
  name: 'Lucas',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALg0uB8eAmK0vHK426azfX1S5lpBxVOlHyEMZKb4FV74dAIpE5Nnkhp6YJ4Ltuf0BO5-jS4dg4bGUsH-nHDByFLw212koKGo-NNuLa0mtFmZSaSChVGSfGzzn8viRBmQh9POYVi3v1xnnzfwxz98HOrxHM-jOiK6QPMnSB5FAzegVFMOyGM2E_oMcvIKdEMKkwYAJwhEQrKBrEIX3sAHztU3H7f26XqyPjz-Paax05yab-lZbfCTLlZXzlFoYhHVTIbGQdcQ_zVLU',
  stars: 65,
  totalStars: 100,
  achievements: [
    { id: '1', title: 'Súper Ordenado', icon: 'Award', color: 'bg-yellow-400', unlocked: true },
    { id: '2', title: 'Buen Lector', icon: 'Sparkles', color: 'bg-blue-400', unlocked: true },
    { id: '3', title: 'Pronto...', icon: 'Rocket', color: 'bg-red-400', unlocked: false },
    { id: '4', title: 'Pronto...', icon: 'Leaf', color: 'bg-green-400', unlocked: false },
  ]
};

const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Hacer la cama',
    description: 'Antes del desayuno',
    stars: 5,
    icon: 'Moon',
    color: 'border-primary',
    status: 'pending',
    childId: 'lucas-1',
    checkList: ['Estirar las sábanas', 'Acomodar las almohadas']
  },
  {
    id: 't2',
    title: 'Leer 15 minutos',
    description: 'Tu libro favorito',
    stars: 10,
    icon: 'BookOpen',
    color: 'border-green-400',
    status: 'pending',
    childId: 'lucas-1'
  },
  {
    id: 't3',
    title: 'Recoger juguetes',
    description: 'Cuarto ordenado',
    stars: 5,
    icon: 'Gamepad2',
    color: 'border-purple-400',
    status: 'pending',
    childId: 'lucas-1',
    checkList: ['Guardar juguetes en su caja', 'Poner la ropa sucia en el canasto']
  }
];

const MOCK_PARENT_CHILDREN: Child[] = [
  {
    id: 'sofia-1',
    name: 'Sofía',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBke31elxxv43BU1TqcueMUxY0Uvc7almAeteKPluaJuoztWk0hejE4JgWeHLtRMZnMTcJ7cY982UejwtMURFFu4YEPVJF9zPN2uQS10uYhPpeyppyvDeqqxVsByazvRDEz7peG8WU6R31LFOMlIFYGAidzAxc5nyZ5iL-bL9wuUNXm-1RYgLcYE0dtBdY3VuZqfJwDOXwVScx6gWvRUx_G-EegGztEcpYBDQiKqlX_CIs-EbG82_F3OFEhv8GETiHnKsNwKFsC0jM',
    stars: 80,
    totalStars: 150,
    achievements: []
  },
  {
    id: 'mateo-1',
    name: 'Mateo',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLOi7-4fo9LfWp3cNFkiS4rgdr5I2q0pcOhEKRExbPEVY7xswmxaBhJogOWzZR_4Pj8qw3IIBDcEZh9aBsNTyrOcWLEHmRzvNI7I7jZkn85Wpci9e06K9uNeyv2mY06i2Pc_DljLmmYMggbj2JT4_3t82uED-g1e-Lxs8NWgqHbNSEzFKPsef-xh4eYFCh7VmioKw8jabB1-PotHyarIWb6fSzNm5HEYzLDPV5GOMTjfGvPyBsPGCB3MVcjK37BuujJlBK4RHtvr0',
    stars: 45,
    totalStars: 100,
    achievements: []
  }
];

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    type: 'reward_redeemed',
    user: 'Mateo',
    detail: 'canjeó un "Helado extra" por 30 estrellas.',
    timestamp: 'Hoy, 14:30',
    color: 'bg-primary'
  },
  {
    id: 'a2',
    type: 'task_approved',
    user: 'Sofía',
    detail: 'Aprobaste la tarea "Poner la mesa" de Sofía.',
    timestamp: 'Hoy, 12:15',
    color: 'bg-green-500'
  }
];

// Components
const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
  switch (name) {
    case 'Home': return <Home className={className} />;
    case 'CheckSquare': return <CheckSquare className={className} />;
    case 'Trophy': return <Trophy className={className} />;
    case 'User': return <User className={className} />;
    case 'Star': return <Star className={className} />;
    case 'Moon': return <Moon className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Gamepad2': return <Gamepad2 className={className} />;
    case 'Rocket': return <Rocket className={className} />;
    case 'Leaf': return <Leaf className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Award': return <Award className={className} />;
    default: return <Star className={className} />;
  }
};

export default function App() {
  const [view, setView] = useState<'login' | 'child_dashboard' | 'task_detail' | 'parent_dashboard'>('login');
  const [role, setRole] = useState<UserRole>('parent');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleLogin = () => {
    if (role === 'child') {
      setView('child_dashboard');
    } else {
      setView('parent_dashboard');
    }
  };

  const openTaskDetail = (task: Task) => {
    setSelectedTask(task);
    setView('task_detail');
  };

  return (
    <div className="min-h-screen bg-background-light text-slate-900 font-sans selection:bg-primary/30">
      <div className="max-w-md mx-auto min-h-screen relative bg-white shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 flex flex-col items-center justify-center min-h-screen"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Home className="text-primary w-10 h-10" />
              </div>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="text-primary w-4 h-4 fill-primary" />
                  <h1 className="text-3xl font-extrabold tracking-tight">TareasFamilia</h1>
                  <Star className="text-primary w-4 h-4 fill-primary" />
                </div>
                <p className="text-slate-500 font-medium">Organiza el hogar con alegría</p>
              </div>

              <div className="w-full bg-slate-100 p-1.5 rounded-xl flex mb-8">
                <button
                  onClick={() => setRole('parent')}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${role === 'parent' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'}`}
                >
                  Soy Padre/Madre
                </button>
                <button
                  onClick={() => setRole('child')}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${role === 'child' ? 'bg-white shadow-sm text-secondary' : 'text-slate-500'}`}
                >
                  Soy Hijo/a
                </button>
              </div>

              <div className="w-full space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Correo electrónico o Usuario</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="ejemplo@familia.com" 
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-primary focus:ring-0 transition-colors outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-primary focus:ring-0 transition-colors outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                    Recordarme
                  </label>
                  <button className="text-primary font-semibold hover:underline">¿Olvidaste tu contraseña?</button>
                </div>

                <button 
                  onClick={handleLogin}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                >
                  Iniciar Sesión
                </button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">¿Eres nuevo aquí?</span></div>
                </div>

                <button className="w-full bg-secondary/10 hover:bg-secondary/20 text-secondary font-bold py-4 rounded-xl border-2 border-secondary/20 transition-all">
                  Crear cuenta familiar
                </button>
              </div>
            </motion.div>
          )}

          {view === 'child_dashboard' && (
            <motion.div
              key="child_dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pb-24"
            >
              <header className="flex items-center justify-between p-6 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-4 border-primary overflow-hidden bg-primary/10">
                    <img src={MOCK_CHILD.avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">¡Hola, {MOCK_CHILD.name}!</h1>
                    <p className="text-sm text-primary font-medium">¡Vamos por esas estrellas!</p>
                  </div>
                </div>
                <button className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100">
                  <Bell className="text-primary w-5 h-5" />
                </button>
              </header>

              <section className="px-6 py-2">
                <div className="bg-primary/10 rounded-2xl p-6 border-2 border-primary/10">
                  <h2 className="text-2xl font-bold leading-tight">
                    Tienes <span className="text-primary italic">3 tareas</span> hoy
                  </h2>
                  <p className="mt-1 text-slate-600">¡Completa todo para ganar premios!</p>
                </div>
              </section>

              <section className="px-6 py-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary/5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold flex items-center gap-2">
                      <Star className="text-primary w-5 h-5 fill-primary" />
                      Mis Estrellas
                    </h3>
                    <span className="text-sm font-bold bg-primary/20 text-primary px-3 py-1 rounded-full">
                      {MOCK_CHILD.stars}/{MOCK_CHILD.totalStars}
                    </span>
                  </div>
                  <div className="w-full bg-primary/10 rounded-full h-4 mb-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(MOCK_CHILD.stars / MOCK_CHILD.totalStars) * 100}%` }}
                      className="bg-primary h-full rounded-full"
                    />
                  </div>
                  <p className="text-xs text-slate-500">Te faltan 35 estrellas para el helado de chocolate</p>
                </div>
              </section>

              <section className="px-6 py-4 space-y-4">
                <h3 className="font-bold text-lg">Tareas de hoy</h3>
                {MOCK_TASKS.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => openTaskDetail(task)}
                    className={`w-full bg-white rounded-2xl p-4 shadow-sm border-l-8 ${task.color} flex items-center gap-4 text-left active:scale-[0.98] transition-transform`}
                  >
                    <div className="bg-slate-100 p-3 rounded-xl">
                      <IconRenderer name={task.icon} className="text-primary w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold">{task.title}</h4>
                      <p className="text-xs text-slate-500">{task.description}</p>
                    </div>
                    <div className="text-center">
                      <span className="text-primary font-bold text-lg block">+{task.stars}</span>
                      <Star className="text-primary w-4 h-4 fill-primary mx-auto" />
                    </div>
                  </button>
                ))}
              </section>

              <section className="px-6 py-4">
                <h3 className="font-bold text-lg mb-4 italic text-primary">Mis Logros</h3>
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {MOCK_CHILD.achievements.map((ach) => (
                    <div key={ach.id} className="min-w-[80px] flex flex-col items-center">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${ach.unlocked ? ach.color.replace('bg-', 'border-').replace('400', '500') + ' ' + ach.color + '/20' : 'border-slate-200 grayscale opacity-50'}`}>
                        <IconRenderer name={ach.icon} className={`${ach.unlocked ? ach.color.replace('bg-', 'text-') : 'text-slate-400'} w-7 h-7`} />
                      </div>
                      <span className={`text-[10px] mt-2 font-bold text-center ${ach.unlocked ? 'text-slate-900' : 'text-slate-400'}`}>
                        {ach.title}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50">
                <button className="flex flex-col items-center text-primary">
                  <Home className="w-6 h-6" />
                  <span className="text-[10px] font-bold">Inicio</span>
                </button>
                <button className="flex flex-col items-center text-slate-400">
                  <CheckSquare className="w-6 h-6" />
                  <span className="text-[10px] font-bold">Tareas</span>
                </button>
                <div className="relative -top-6">
                  <button className="bg-primary w-14 h-14 rounded-full shadow-lg shadow-primary/40 flex items-center justify-center border-4 border-white">
                    <Plus className="text-white w-8 h-8" />
                  </button>
                </div>
                <button className="flex flex-col items-center text-slate-400">
                  <Trophy className="w-6 h-6" />
                  <span className="text-[10px] font-bold">Premios</span>
                </button>
                <button className="flex flex-col items-center text-slate-400">
                  <User className="w-6 h-6" />
                  <span className="text-[10px] font-bold">Perfil</span>
                </button>
              </nav>
            </motion.div>
          )}

          {view === 'task_detail' && selectedTask && (
            <motion.div
              key="task_detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="pb-32"
            >
              <header className="p-6 flex items-center justify-between">
                <button 
                  onClick={() => setView('child_dashboard')}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-primary"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold tracking-tight">Detalle de Tarea</h1>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Trophy className="w-6 h-6" />
                </div>
              </header>

              <main className="px-6 space-y-6">
                <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS0KKFPWDsal9jFStnMFqdgDZ3sIwxeqKuQAZENzohG7wOEVFIMruAoW0kqcnL5gqyvL6-Stn8L0XeJz3Cn8q7Era6KSnMsDBY3vdGT6BDXachKbulSYLyxMFZ2GqZNjBvsaU5Gf8sdf5ZW6IbobUZvjiMFVobv4ceveJIIqnd1mI_ZHxNTpRUgXD6-eEmwPsWS6sZQG18_1_FJAma6umY4n7pwBP_DeH44ytgPE7YMY7B6wsvSzCcCmhzYAFg7LFYBEx2HLGMe0w" 
                    alt="Task" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-lg">
                      <Star className="w-4 h-4 fill-white" />
                      +{selectedTask.stars * 10} Estrellas
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-extrabold leading-tight">{selectedTask.title}</h2>
                  <div className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold w-fit">
                    <CheckSquare className="w-4 h-4" />
                    Hoy antes de las 6:00 PM
                  </div>
                </div>

                <div className="bg-primary/5 border-2 border-primary/10 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-md">
                    <Award className="text-white w-10 h-10" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary/60 uppercase tracking-widest">Premio esperado</p>
                    <p className="text-xl font-extrabold">{selectedTask.stars * 10} Estrellas Mágicas</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    ¿Qué tengo que hacer?
                  </h3>
                  <ul className="space-y-3">
                    {(selectedTask.checkList || ['Guardar todo', 'Limpiar el área', 'Avisar al terminar']).map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0" />
                        <span className="font-medium text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-2xl p-5 border-l-4 border-blue-400 flex gap-4">
                  <Info className="text-blue-500 w-6 h-6 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-blue-900">¡Recuerda!</p>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      Cuando termines, toma una foto de tu cuarto bien limpio para que papá o mamá puedan darte tus estrellas.
                    </p>
                  </div>
                </div>
              </main>

              <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent max-w-md mx-auto">
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-3 transition-transform active:scale-95">
                  <Camera className="w-7 h-7" />
                  <span className="text-xl">SUBIR FOTO DE EVIDENCIA</span>
                </button>
              </div>
            </motion.div>
          )}

          {view === 'parent_dashboard' && (
            <motion.div
              key="parent_dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pb-24"
            >
              <header className="flex items-center justify-between p-6 pt-8 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU9TydDmZRERtZ6jO807FsAxC6wf82mZ-y8bK8-CVKo0OVhmpI1YvJgWPfSvptxJotsb27mGD8EE-jjfjDWsXv3jhw1TpAInztQhhMoJNJiJHx0zQldfC0Hmfz9INkLIHO-XeIFClrV1GbcmLr6mIGv8Eg-9SDUeLXptKtQZJkDou5eQuRKwPbQt0PBNRixzpMjBlzrJ7Admj_kOG8ByEwfS-J-ceS8pvof7v2b9naTw-RXnJ9oEc2Zw6rKeVUCNwUZ8gX0ArzqMk" 
                      alt="Parent" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">¡Hola, Papá!</p>
                    <h1 className="text-xl font-extrabold leading-tight">Panel de Control</h1>
                  </div>
                </div>
                <button className="relative p-2.5 rounded-xl bg-slate-50 text-slate-700">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
              </header>

              <div className="p-6 grid grid-cols-2 gap-4">
                <div className="bg-primary/10 rounded-2xl p-5 border border-primary/20 shadow-sm">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <CheckSquare className="w-5 h-5" />
                    <p className="text-xs font-bold uppercase tracking-widest">Por revisar</p>
                  </div>
                  <p className="text-3xl font-extrabold">8</p>
                  <p className="text-xs text-slate-500 mt-1">Tareas pendientes</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-200 shadow-sm">
                  <div className="flex items-center gap-2 text-yellow-600 mb-2">
                    <Star className="w-5 h-5 fill-yellow-600" />
                    <p className="text-xs font-bold uppercase tracking-widest">Total Hoy</p>
                  </div>
                  <p className="text-3xl font-extrabold">125</p>
                  <p className="text-xs text-slate-500 mt-1">Estrellas ganadas</p>
                </div>
              </div>

              <section className="px-6 py-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold tracking-tight">Mis Hijos</h2>
                  <button className="text-primary text-sm font-bold">Ver todos</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {MOCK_PARENT_CHILDREN.map((child) => (
                    <div key={child.id} className="min-w-[140px] flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                      <div className="w-16 h-16 rounded-full border-2 border-primary/30 p-1">
                        <img src={child.avatar} alt={child.name} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{child.name}</p>
                        <div className="flex items-center justify-center gap-1 text-primary">
                          <Star className="w-3 h-3 fill-primary" />
                          <span className="text-sm font-bold">{child.stars}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="min-w-[140px] flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 p-4 text-slate-400">
                    <Plus className="w-6 h-6" />
                    <p className="text-xs font-bold">Añadir hijo</p>
                  </button>
                </div>
              </section>

              <section className="px-6 py-6">
                <h2 className="text-xl font-bold tracking-tight mb-4">Tareas por revisar</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-primary">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm">Limpiar el cuarto</h3>
                      <p className="text-xs text-slate-500">Sofía • Hace 10 min</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md shadow-green-200">
                        <Check className="w-5 h-5" />
                      </button>
                      <button className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm">Leer 20 minutos</h3>
                      <p className="text-xs text-slate-500">Mateo • Hace 1 hora</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md shadow-green-200">
                        <Check className="w-5 h-5" />
                      </button>
                      <button className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="px-6 py-2">
                <h2 className="text-xl font-bold tracking-tight mb-4">Actividad reciente</h2>
                <div className="border-l-2 border-slate-100 ml-3 space-y-6">
                  {MOCK_ACTIVITIES.map((activity) => (
                    <div key={activity.id} className="relative pl-6">
                      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${activity.color} ring-4 ring-white`}></div>
                      <p className="text-xs text-slate-400 mb-1">{activity.timestamp}</p>
                      <p className="text-sm font-medium">
                        <span className="font-bold">{activity.user}</span> {activity.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <button className="fixed bottom-24 right-6 w-16 h-16 bg-primary rounded-full shadow-xl shadow-primary/40 flex items-center justify-center text-white z-50 hover:scale-105 transition-transform active:scale-95">
                <Plus className="w-8 h-8" />
              </button>

              <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-sm border-t border-slate-100 px-8 py-4 z-40">
                <div className="flex justify-between items-center">
                  <button className="flex flex-col items-center gap-1 text-primary">
                    <Home className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Inicio</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 text-slate-400">
                    <CheckSquare className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Tareas</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 text-slate-400">
                    <Trophy className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Premios</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 text-slate-400">
                    <Settings className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Ajustes</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
