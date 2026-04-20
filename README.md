# E-Pick API Tester

Aplicación simple para probar todos los endpoints de la API de e-pick.cl

## 📋 Requisitos

- Node.js 14 o superior
- Cuenta en https://e-pick.cl

## 🚀 Instalación

1. Copia todos los archivos a una carpeta
2. Abre la terminal en esa carpeta
3. Instala las dependencias:

```bash
npm install
```

## ▶️ Uso

1. Inicia el servidor:

```bash
npm start
```

O para desarrollo con auto-reload:

```bash
npm run dev
```

2. Abre tu navegador en: **http://localhost:3000**

3. Sigue estos pasos en la interfaz:

### Paso 1: Login
- Ingresa tu teléfono y contraseña de e-pick.cl
- Click en "Login"
- Si es exitoso, verás "Logueado ✓" en verde

### Paso 2: Calcular Cotización
- Ajusta las medidas del paquete si es necesario
- Modifica origen y destino
- Click en "Calcular"
- Verás el precio y tiempo estimado

### Paso 3: Crear Orden
- Opcionalmente agrega una URL de webhook
- Click en "Crear Orden"
- Los campos de confirmación se llenarán automáticamente

### Paso 4: Confirmar Orden
- Usa los datos de la orden creada (auto-completados)
- Click en "Confirmar"

### Paso 5: Tracking
- Ingresa el ID de la orden
- Click en "Consultar Tracking"

## 📁 Estructura

```
epick-api-tester/
├── server.js          # Backend Express
├── public/
│   └── index.html     # Frontend simple
├── package.json       # Dependencias
├── .env.example       # Variables de entorno (ejemplo)
└── README.md          # Este archivo
```

## 🔧 Configuración Opcional

Puedes crear un archivo `.env` con tus credenciales:

```env
PORT=3000
EPICK_PHONE=tu_telefono
EPICK_PASSWORD=tu_password
```

## 📝 Notas

- El token de autenticación se guarda en memoria del servidor
- El token expira en 24 horas
- Los webhooks se reciben en `http://localhost:3000/webhook`
- Verifica la consola del servidor para ver los webhooks recibidos

## 🐛 Troubleshooting

**Error de CORS:**
- Asegúrate de que el servidor esté corriendo
- Verifica que estés accediendo desde localhost:3000

**Token inválido:**
- Vuelve a hacer login
- El token expira cada 24 horas

**Error de conexión:**
- Verifica tu conexión a internet
- Comprueba que e-pick.cl esté disponible
