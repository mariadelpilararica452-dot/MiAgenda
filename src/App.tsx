/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Smartphone, 
  Code2, 
  BookOpen, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  HelpCircle, 
  Layers, 
  Cpu, 
  Sparkles,
  ArrowRight,
  Info,
  AlertCircle,
  Calendar,
  Flag,
  Edit3,
  X,
  Save,
  Search,
  PieChart
} from 'lucide-react';

type Priority = 'Baja' | 'Media' | 'Alta';

interface Activity {
  id: string;
  text: string;
  date: string;
  priority: Priority;
  completed: boolean;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'guide' | 'concepts'>('simulator');
  
  // Get today's date formatted as YYYY-MM-DD for default value
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Format date for nice display (DD/MM/YYYY)
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    if (!year || !month || !day) return dateString;
    return `${day}/${month}/${year}`;
  };

  // App state for the simulated Android app
  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', text: 'Estudiar Jetpack Compose', date: getTodayDate(), priority: 'Alta', completed: true },
    { id: '2', text: 'Hacer tarea de Matemáticas', date: getTodayDate(), priority: 'Media', completed: false },
    { id: '3', text: 'Practicar Kotlin básico', date: getTodayDate(), priority: 'Baja', completed: false },
  ]);
  const [inputText, setInputText] = useState('');
  const [inputDate, setInputDate] = useState(getTodayDate());
  const [inputPriority, setInputPriority] = useState<Priority>('Media');
  const [errorMessage, setErrorMessage] = useState('');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editPriority, setEditPriority] = useState<Priority>('Media');
  const [editErrorMessage, setEditErrorMessage] = useState('');

  const [copied, setCopied] = useState(false);

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setErrorMessage('Por favor, escribe una actividad.');
      return;
    }
    setErrorMessage('');
    const newAct: Activity = {
      id: Date.now().toString(),
      text: inputText.trim(),
      date: inputDate || getTodayDate(),
      priority: inputPriority,
      completed: false,
    };
    setActivities([newAct, ...activities]);
    setInputText('');
    setInputDate(getTodayDate());
    setInputPriority('Media');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleToggleComplete = (id: string) => {
    setActivities(activities.map(act => 
      act.id === id ? { ...act, completed: !act.completed } : act
    ));
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(act => act.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleStartEdit = (activity: Activity) => {
    setEditingId(activity.id);
    setEditText(activity.text);
    setEditDate(activity.date);
    setEditPriority(activity.priority);
    setEditErrorMessage('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditDate('');
    setEditErrorMessage('');
  };

  const handleSaveEdit = (id: string) => {
    if (!editText.trim()) {
      setEditErrorMessage('El nombre no puede estar vacío.');
      return;
    }
    setActivities(activities.map(act => 
      act.id === id ? { ...act, text: editText.trim(), date: editDate || getTodayDate(), priority: editPriority } : act
    ));
    setEditingId(null);
    setEditText('');
    setEditDate('');
    setEditErrorMessage('');
  };

  // Progress stats
  const totalTasks = activities.length;
  const completedTasks = activities.filter(a => a.completed).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filtered activities based on search query
  const filteredActivities = activities.filter(act =>
    act.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityBadgeStyle = (priority: Priority) => {
    switch (priority) {
      case 'Alta':
        return 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-300 border-rose-500/40 shadow-sm shadow-rose-500/10';
      case 'Media':
        return 'bg-gradient-to-r from-amber-500/25 to-yellow-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10';
      case 'Baja':
        return 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/10';
    }
  };

  const kotlinCode = `package com.example.miagenda

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material.icons.filled.Flag
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.miagenda.ui.theme.MiAgendaTheme
import java.text.SimpleDateFormat
import java.util.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MiAgendaTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AgendaScreen()
                }
            }
        }
    }
}

enum class Priority {
    BAJA, MEDIA, ALTA
}

@Composable
fun AgendaScreen() {
    val todayFormatted = remember {
        val formatter = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
        formatter.format(Date())
    }

    var textInput by remember { mutableStateOf("") }
    var dateInput by remember { mutableStateOf(todayFormatted) }
    var selectedPriority by remember { mutableStateOf(Priority.MEDIA) }
    var errorMessage by remember { mutableStateOf("") }
    
    // Estado para búsqueda y edición
    var searchQuery by remember { mutableStateOf("") }
    var editingId by remember { mutableStateOf<String?>(null) }
    var editText by remember { mutableStateOf("") }
    var editDate by remember { mutableStateOf("") }

    val activities = remember { mutableStateListOf<ActivityItem>() }

    // Estadísticas de progreso
    val totalTasks = activities.size
    val completedTasks = activities.count { it.completed }
    val progress = if (totalTasks > 0) completedTasks.toFloat() / totalTasks else 0f
    val percentage = (progress * 100).toInt()

    // Filtrar actividades en tiempo real según la búsqueda
    val filteredActivities = activities.filter { 
        it.text.contains(searchQuery, ignoreCase = true) 
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Título de la aplicación con color vibrante
        Text(
            text = "Mi Agenda",
            style = MaterialTheme.typography.headlineMedium,
            color = MaterialTheme.colorScheme.primary,
            modifier = Modifier.padding(bottom = 12.dp)
        )

        // Tarjeta de Resumen con Barra de Progreso Mejorada
        Card(
            modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Progreso de tareas",
                        style = MaterialTheme.typography.titleSmall
                    )
                    Text(
                        text = "$completedTasks de $totalTasks ($percentage%)",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
                Spacer(modifier = Modifier.height(8.dp))
                LinearProgressIndicator(
                    progress = progress,
                    modifier = Modifier.fillMaxWidth().height(8.dp),
                    shape = RoundedCornerShape(4.dp)
                )
            }
        }

        // Campo para escribir la actividad
        OutlinedTextField(
            value = textInput,
            onValueChange = { 
                textInput = it
                if (errorMessage.isNotEmpty()) errorMessage = ""
            },
            label = { Text("Escribe una actividad") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            isError = errorMessage.isNotEmpty()
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Fila para Fecha y Selector de Prioridad
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = dateInput,
                onValueChange = { dateInput = it },
                label = { Text("Fecha") },
                modifier = Modifier.weight(1f),
                singleLine = true,
                leadingIcon = {
                    Icon(Icons.Default.DateRange, contentDescription = "Fecha")
                }
            )

            // Selector de Prioridad
            var expanded by remember { mutableStateOf(false) }
            Box(modifier = Modifier.weight(1f)) {
                OutlinedButton(
                    onClick = { expanded = true },
                    modifier = Modifier.fillMaxWidth().height(56.dp)
                ) {
                    Icon(Icons.Default.Flag, contentDescription = "Prioridad", modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(text = selectedPriority.name)
                }
                DropdownMenu(
                    expanded = expanded,
                    onDismissRequest = { expanded = false }
                ) {
                    Priority.values().forEach { priority ->
                        DropdownMenuItem(
                            text = { Text(priority.name) },
                            onClick = {
                                selectedPriority = priority
                                expanded = false
                            }
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        // Botón Agregar
        Button(
            onClick = {
                if (textInput.isNotBlank()) {
                    val finalDate = if (dateInput.isBlank()) todayFormatted else dateInput
                    activities.add(0, ActivityItem(text = textInput.trim(), date = finalDate, priority = selectedPriority))
                    textInput = ""
                    dateInput = todayFormatted
                    selectedPriority = Priority.MEDIA
                    errorMessage = ""
                } else {
                    errorMessage = "Por favor, escribe una actividad."
                }
            },
            modifier = Modifier.fillMaxWidth(),
            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
        ) {
            Text("Agregar actividad")
        }

        if (errorMessage.isNotEmpty()) {
            Text(
                text = errorMessage,
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(top = 4.dp, start = 4.dp)
            )
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Barra de búsqueda en tiempo real
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            label = { Text("Buscar actividad...") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            leadingIcon = {
                Icon(Icons.Default.Search, contentDescription = "Buscar")
            }
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Lista de actividades filtradas (LazyColumn)
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(filteredActivities, key = { it.id }) { activity ->
                val isEditing = editingId == activity.id

                if (isEditing) {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                    ) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            OutlinedTextField(
                                value = editText,
                                onValueChange = { editText = it },
                                label = { Text("Editar nombre") },
                                modifier = Modifier.fillMaxWidth(),
                                singleLine = true
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            OutlinedTextField(
                                value = editDate,
                                onValueChange = { editDate = it },
                                label = { Text("Editar fecha") },
                                modifier = Modifier.fillMaxWidth(),
                                singleLine = true
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.End,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                TextButton(onClick = { editingId = null }) {
                                    Icon(Icons.Default.Close, contentDescription = "Cancelar", modifier = Modifier.size(16.dp))
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("Cancelar")
                                }
                                Spacer(modifier = Modifier.width(8.dp))
                                Button(
                                    onClick = {
                                        if (editText.isNotBlank()) {
                                            activity.text = editText.trim()
                                            activity.date = if (editDate.isBlank()) todayFormatted else editDate
                                            editingId = null
                                        }
                                    }
                                ) {
                                    Icon(Icons.Default.Check, contentDescription = "Guardar", modifier = Modifier.size(16.dp))
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("Guardar")
                                }
                            }
                        }
                    }
                } else {
                    ActivityRow(
                        activity = activity,
                        onCheckedChange = { isChecked ->
                            activity.completed = isChecked
                        },
                        onEdit = {
                            editingId = activity.id
                            editText = activity.text
                            editDate = activity.date
                        },
                        onDelete = {
                            activities.remove(activity)
                        }
                    )
                }
            }
        }
    }
}

data class ActivityItem(
    val id: String = java.util.UUID.randomUUID().toString(),
    var text: String,
    var date: String,
    var priority: Priority,
    var completed: Boolean = false
)

@Composable
fun ActivityRow(
    activity: ActivityItem,
    onCheckedChange: (Boolean) -> Unit,
    onEdit: () -> Unit,
    onDelete: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.weight(1f)
            ) {
                Checkbox(
                    checked = activity.completed,
                    onCheckedChange = onCheckedChange
                )
                Spacer(modifier = Modifier.width(8.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Text(
                            text = activity.text,
                            style = MaterialTheme.typography.bodyLarge,
                            textDecoration = if (activity.completed) TextDecoration.LineThrough else TextDecoration.None,
                            modifier = Modifier.weight(1f, fill = false)
                        )
                        
                        PriorityBadge(priority = activity.priority)
                    }
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(
                        text = activity.date,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            Row(verticalAlignment = Alignment.CenterVertically) {
                IconButton(onClick = onEdit) {
                    Icon(
                        imageVector = Icons.Default.Edit,
                        contentDescription = "Editar actividad",
                        tint = MaterialTheme.colorScheme.primary
                    )
                }
                IconButton(onClick = onDelete) {
                    Icon(
                        imageVector = Icons.Default.Delete,
                        contentDescription = "Eliminar actividad",
                        tint = MaterialTheme.colorScheme.error
                    )
                }
            }
        }
    }
}

@Composable
fun PriorityBadge(priority: Priority) {
    val color = when (priority) {
        Priority.ALTA -> Color(0xFFF43F5E)
        Priority.MEDIA -> Color(0xFFF59E0B)
        Priority.BAJA -> Color(0xFF10B981)
    }
    Surface(
        color = color.copy(alpha = 0.2f),
        shape = RoundedCornerShape(4.dp)
    ) {
        Text(
            text = priority.name,
            color = color,
            style = MaterialTheme.typography.labelSmall,
            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
            fontSize = 10.sp
        )
    }
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(kotlinCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400/20">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-transparent">Mi Agenda</h1>
            <p className="text-xs text-indigo-300/80">Kotlin & Jetpack Compose · Colorimetría Moderna</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-indigo-500/20 shadow-inner">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'simulator' 
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/40 ring-1 ring-white/20' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Simulador Interactivo
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'code' 
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/40 ring-1 ring-white/20' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Código Kotlin
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'guide' 
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/40 ring-1 ring-white/20' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Organización de Pantalla
          </button>
          <button
            onClick={() => setActiveTab('concepts')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'concepts' 
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/40 ring-1 ring-white/20' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Conceptos Clave
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('code')}
            className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 ring-1 ring-white/20"
          >
            <Code2 className="w-4 h-4" />
            <span>Ver Código</span>
          </button>
        </div>
      </header>

      {/* Mobile nav indicator bar for small screens */}
      <div className="md:hidden flex overflow-x-auto gap-2 p-3 bg-slate-900 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${activeTab === 'simulator' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}
        >
          Simulador
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${activeTab === 'code' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}
        >
          Código Kotlin
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${activeTab === 'guide' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}
        >
          Organización
        </button>
        <button
          onClick={() => setActiveTab('concepts')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${activeTab === 'concepts' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}
        >
          Conceptos
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Vibrant Phone Preview Mockup */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="mb-3 text-center">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-violet-500/15 via-indigo-500/15 to-cyan-500/15 text-indigo-300 border border-indigo-500/30 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-glow"></span>
                  Simulador Estilo Celular (Colorimetría Moderna)
                </span>
              </div>

              {/* Android Phone Frame with Glowing Vibrant Border */}
              <div className="w-full max-w-[390px] bg-slate-900 border-4 border-indigo-500/40 rounded-[44px] p-4 shadow-[0_0_35px_rgba(99,102,241,0.25)] relative overflow-hidden ring-4 ring-slate-900">
                {/* Phone Speaker & Camera notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-950 rounded-full flex items-center justify-center gap-2 border border-slate-800">
                  <div className="w-2 h-2 rounded-full bg-indigo-500/60"></div>
                  <div className="w-10 h-1.5 rounded-full bg-indigo-500/40"></div>
                </div>

                {/* Simulated Android Screen Content */}
                <div className="mt-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-[32px] p-4 border border-indigo-500/20 min-h-[610px] flex flex-col justify-between shadow-inner">
                  <div>
                    {/* App Bar / Title */}
                    <div className="flex items-center justify-between mb-3 border-b border-indigo-500/20 pb-2.5">
                      <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-transparent">Mi Agenda</h2>
                      <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg shadow-inner">
                        {activities.filter(a => !a.completed).length} pendientes
                      </span>
                    </div>

                    {/* Summary Card with Vibrant Gradient Progress Bar */}
                    <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-3.5 mb-3 shadow-lg shadow-indigo-500/5">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-indigo-200 flex items-center gap-1.5">
                          <PieChart className="w-3.5 h-3.5 text-cyan-400" />
                          Progreso de tareas
                        </span>
                        <span className="font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded">
                          {completedTasks} / {totalTasks} ({progressPercentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-indigo-500/20 p-0.5">
                        <div 
                          className="bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 h-full transition-all duration-500 rounded-full shadow-glow"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Input, Date, Priority Form */}
                    <form onSubmit={handleAddActivity} className="mb-1 space-y-2">
                      <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Escribe una actividad..."
                        className={`w-full bg-slate-900 border text-slate-100 px-3 py-2 rounded-xl text-xs focus:outline-none transition-colors placeholder:text-slate-500 ${
                          errorMessage ? 'border-rose-500 focus:border-rose-500' : 'border-indigo-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20'
                        }`}
                      />

                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-cyan-400">
                            <Calendar className="w-3.5 h-3.5" />
                          </span>
                          <input
                            type="date"
                            value={inputDate}
                            onChange={(e) => setInputDate(e.target.value)}
                            className="w-full bg-slate-900 border border-indigo-500/30 text-slate-100 pl-8 pr-2 py-1.5 rounded-xl text-[11px] focus:outline-none focus:border-cyan-400 transition-colors"
                            title="Fecha"
                          />
                        </div>

                        <select
                          value={inputPriority}
                          onChange={(e) => setInputPriority(e.target.value as Priority)}
                          className="flex-1 bg-slate-900 border border-indigo-500/30 text-slate-100 px-2 py-1.5 rounded-xl text-[11px] focus:outline-none focus:border-cyan-400 transition-colors"
                        >
                          <option value="Baja">Prioridad: Baja</option>
                          <option value="Media">Prioridad: Media</option>
                          <option value="Alta">Prioridad: Alta</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/30 ring-1 ring-white/20"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Agregar actividad</span>
                      </button>
                    </form>

                    {errorMessage && (
                      <div className="flex items-center gap-1.5 text-rose-400 text-[11px] mt-1 mb-1.5 pl-1 font-medium bg-rose-500/10 p-1.5 rounded-lg border border-rose-500/20">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}
                    {!errorMessage && <div className="mb-1.5"></div>}

                    {/* Search Bar */}
                    <div className="relative mb-2.5">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-cyan-400">
                        <Search className="w-3 h-3" />
                      </span>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar actividad..."
                        className="w-full bg-slate-900 border border-indigo-500/30 text-slate-100 pl-8 pr-3 py-1.5 rounded-xl text-xs focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-500"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Activities List (LazyColumn simulated) */}
                    <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                      {filteredActivities.length === 0 ? (
                        <div className="text-center py-6 text-slate-500 text-xs">
                          <Search className="w-6 h-6 mx-auto mb-1 opacity-40 text-cyan-400" />
                          {searchQuery ? 'No se encontraron actividades.' : 'No hay actividades aún.'}
                        </div>
                      ) : (
                        filteredActivities.map((activity) => {
                          const isEditing = editingId === activity.id;
                          return (
                            <div key={activity.id}>
                              {isEditing ? (
                                /* Edit Form Inline */
                                <div className="bg-slate-900 border border-indigo-500/60 rounded-xl p-2.5 space-y-1.5 shadow-lg">
                                  <div className="text-[11px] font-semibold text-cyan-400 flex items-center gap-1">
                                    <Edit3 className="w-3 h-3" />
                                    <span>Editando actividad</span>
                                  </div>
                                  <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => {
                                      setEditText(e.target.value);
                                      if (editErrorMessage) setEditErrorMessage('');
                                    }}
                                    placeholder="Nombre de la actividad"
                                    className="w-full bg-slate-950 border border-indigo-500/30 text-slate-100 px-2.5 py-1.5 rounded-lg text-xs focus:outline-none focus:border-cyan-400"
                                  />
                                  <input
                                    type="date"
                                    value={editDate}
                                    onChange={(e) => setEditDate(e.target.value)}
                                    className="w-full bg-slate-950 border border-indigo-500/30 text-slate-100 px-2.5 py-1 rounded-lg text-xs focus:outline-none focus:border-cyan-400"
                                  />
                                  {editErrorMessage && (
                                    <p className="text-[10px] text-rose-400 font-medium">{editErrorMessage}</p>
                                  )}
                                  <div className="flex justify-end gap-1.5 pt-0.5">
                                    <button
                                      onClick={handleCancelEdit}
                                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1"
                                    >
                                      <X className="w-3 h-3" />
                                      <span>Cancelar</span>
                                    </button>
                                    <button
                                      onClick={() => handleSaveEdit(activity.id)}
                                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-colors flex items-center gap-1 shadow-sm"
                                    >
                                      <Save className="w-3 h-3" />
                                      <span>Guardar</span>
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                /* Normal Row */
                                <div
                                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                                    activity.completed
                                      ? 'bg-slate-900/30 border-slate-800/60 opacity-60'
                                      : 'bg-slate-900/80 border-indigo-500/20 hover:border-indigo-500/40 shadow-sm'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                    <input
                                      type="checkbox"
                                      checked={activity.completed}
                                      onChange={() => handleToggleComplete(activity.id)}
                                      className="w-3.5 h-3.5 rounded border-indigo-500/40 text-indigo-600 focus:ring-indigo-500 bg-slate-800 cursor-pointer accent-indigo-500 shrink-0"
                                    />
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <p
                                          className={`text-xs truncate ${
                                            activity.completed
                                              ? 'line-through text-slate-500'
                                              : 'text-slate-100 font-semibold'
                                          }`}
                                        >
                                          {activity.text}
                                        </p>
                                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${getPriorityBadgeStyle(activity.priority)}`}>
                                          {activity.priority}
                                        </span>
                                      </div>
                                      <p className="text-[10px] text-indigo-300/80 flex items-center gap-1 mt-0.5">
                                        <Calendar className="w-2.5 h-2.5 text-cyan-400" />
                                        <span>{formatDateDisplay(activity.date)}</span>
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-0.5 shrink-0 ml-1">
                                    <button
                                      onClick={() => handleStartEdit(activity)}
                                      className="text-indigo-300/70 hover:text-cyan-400 p-1 rounded-lg hover:bg-cyan-500/10 transition-colors"
                                      title="Editar actividad"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteActivity(activity.id)}
                                      className="text-slate-400 hover:text-rose-400 p-1 rounded-lg hover:bg-rose-500/10 transition-colors"
                                      title="Eliminar actividad"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Android Navigation bar hint */}
                  <div className="pt-2 border-t border-indigo-500/10 flex justify-center">
                    <div className="w-28 h-1 bg-indigo-500/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Explanation and Quick Guide */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="bg-slate-900 border border-indigo-500/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Colorimetría Moderna y Diseño Celular</h3>
                    <p className="text-xs text-indigo-300">Gradientes vibrantes, tarjetas iluminadas y estética móvil de vanguardia</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <p>
                    Se ha aplicado un rediseño completo de <strong className="text-white">colorimetría y tonos intensos</strong> manteniendo el 100% de la funcionalidad solicitada:
                  </p>
                  
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-indigo-500/30 space-y-2">
                    <strong className="text-cyan-300 block text-xs font-semibold uppercase tracking-wider">Paleta Moderna Aplicada:</strong>
                    <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
                      <li><strong className="text-violet-400">Gradientes Neón:</strong> Botones principales y barras de progreso con mezclas de violeta, índigo y cian luminoso.</li>
                      <li><strong className="text-pink-400">Prioridades Vibrantes:</strong> Etiquetas de prioridad con fondos translúcidos enriquecidos y bordes brillantes.</li>
                      <li><strong className="text-indigo-300">Modelo Celular Realista:</strong> Contenedor de smartphone con bordes iluminados, barra de notificaciones y diseño adaptado al tacto.</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-indigo-500/20 flex items-center justify-between">
                  <span className="text-xs text-slate-400">¿Quieres ver el código en Kotlin actualizado?</span>
                  <button
                    onClick={() => setActiveTab('code')}
                    className="px-4 py-2 text-xs font-medium text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors rounded-lg flex items-center gap-1.5 border border-cyan-500/30"
                  >
                    <span>Ver Código Kotlin</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-slate-950 px-6 py-4 border-b border-indigo-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">MainActivity.kt</h3>
                  <p className="text-xs text-indigo-300">Código fuente completo con Material 3 y colorimetría moderna</p>
                </div>
              </div>

              <button
                onClick={copyToClipboard}
                className="px-3.5 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors flex items-center gap-2 border border-indigo-500/30"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '¡Copiado!' : 'Copiar Código'}</span>
              </button>
            </div>

            <div className="p-6 overflow-x-auto bg-slate-950 font-mono text-xs leading-relaxed text-slate-300 max-h-[600px]">
              <pre>
                <code>{kotlinCode}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-indigo-500/20 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-300">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Modelo de Celular y Estética</h3>
                  <p className="text-xs text-indigo-300">Diseño enfocado en la experiencia táctil</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <p>
                  El simulador representa fielmente el marco de un dispositivo móvil moderno con bordes estilizados, indicadores de cámara y una pantalla táctil optimizada para Jetpack Compose.
                </p>
              </div>
            </div>

            <div className="bg-slate-900 border border-indigo-500/20 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Material 3 & Colores Intensos</h3>
                  <p className="text-xs text-indigo-300">Temas y esquemas vibrantes</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <p>
                  En Kotlin, el uso de esquemas de color de Material 3 combinados con superficies y contenedores personalizados permite lograr este aspecto moderno y atractivo.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'concepts' && (
          <div className="bg-slate-900 border border-indigo-500/20 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-xs font-medium px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Guía para Principiantes
                </span>
                <h2 className="text-2xl font-bold text-white mt-3 mb-2">Conceptos Clave de Kotlin y Jetpack Compose</h2>
                <p className="text-sm text-indigo-300">Todo lo que necesitas saber para entender y empezar a crear tus propias apps Android.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-slate-950/80 rounded-xl border border-indigo-500/20">
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                    Material 3 Theme
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Jetpack Compose utiliza <code className="text-cyan-300">MaterialTheme</code> para aplicar automáticamente colores coherentes, tipografías y formas en toda la app.
                  </p>
                </div>

                <div className="p-5 bg-slate-950/80 rounded-xl border border-indigo-500/20">
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Tarjetas y Contenedores
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    El uso de componentes como <code className="text-cyan-300">Card</code> y <code className="text-cyan-300">Surface</code> ayuda a estructurar visualmente la información con contraste y elegancia.
                  </p>
                </div>

                <div className="p-5 bg-slate-950/80 rounded-xl border border-indigo-500/20">
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    Indicadores de Progreso
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Elementos como <code className="text-cyan-300">LinearProgressIndicator</code> ofrecen retroalimentación visual inmediata del avance del usuario.
                  </p>
                </div>

                <div className="p-5 bg-slate-950/80 rounded-xl border border-indigo-500/20">
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Diseño Responsivo
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Los diseños en Compose se adaptan de forma natural a diferentes tamaños de pantalla y densidades de píxeles en dispositivos Android.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-indigo-500/20 py-6 text-center text-xs text-indigo-300/70 mt-12">
        <p>Mi Agenda · Aplicación Android creada con Kotlin y Jetpack Compose para principiantes.</p>
      </footer>
    </div>
  );
}
