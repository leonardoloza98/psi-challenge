-- Dataset Ficticio de Sesiones de Psicología
Asumo que la tabla de profesionales ya existe y tiene los siguientes campos:
id,
nombre,
especialidad,
modalidad_disponible

Asumo que la tabla de pacientes ya existe y tiene los siguientes campos:
id,
nombre,
edad,
genero

Asumo que la tabla de sesiones ya existe y tiene los siguientes campos:
id,
profesional_id,
paciente_id,
fecha,
hora,
modalidad,
tematica,
duracion_minutos,
estado

Dataset para profesionales:
(1, 'Dra. María González', 'Psicología Clínica', 'Online, Presencial'),
(2, 'Dr. Carlos Mendoza', 'Psicología Infantil', 'Online'),
(3, 'Dra. Ana Rodríguez', 'Psicología Organizacional', 'Presencial'),
(4, 'Dr. Luis Pérez', 'Terapia de Pareja', 'Online, Presencial'),
(5, 'Dra. Carmen Silva', 'Tratamiento de Ansiedad', 'Online');

Dataset para pacientes:
(1, 'Juan Pérez', 28, 'Masculino'),
(2, 'María López', 35, 'Femenino'),
(3, 'Carlos García', 42, 'Masculino'),
(4, 'Ana Martínez', 29, 'Femenino'),
(5, 'Luis Rodríguez', 38, 'Masculino'),
(6, 'Carmen Torres', 31, 'Femenino'),
(7, 'Roberto Sánchez', 45, 'Masculino'),
(8, 'Patricia Ruiz', 26, 'Femenino'),
(9, 'Miguel Castro', 33, 'Masculino'),
(10, 'Sofia Vargas', 27, 'Femenino');

Dataset para sesiones:
(1, 1, 1, '2024-01-02', '09:00:00', 'Online', 'Ansiedad', 60, 'Completed'),
(2, 1, 2, '2024-01-03', '10:00:00', 'Presencial', 'Depresión', 60, 'Completed'),
(3, 2, 3, '2024-01-04', '14:00:00', 'Online', 'TDAH', 60, 'Completed'),
(4, 3, 4, '2024-01-05', '15:00:00', 'Presencial', 'Estrés Laboral', 60, 'Completed'),
(5, 4, 5, '2024-01-08', '16:00:00', 'Online', 'Problemas de Pareja', 60, 'Completed'),
(6, 5, 6, '2024-01-09', '11:00:00', 'Online', 'Ansiedad', 60, 'Completed'),
(7, 1, 7, '2024-01-10', '13:00:00', 'Presencial', 'Autoestima', 60, 'Completed'),
(8, 2, 8, '2024-01-11', '09:00:00', 'Online', 'Problemas de Conducta', 60, 'Completed'),
(9, 3, 9, '2024-01-12', '14:00:00', 'Presencial', 'Coaching Ejecutivo', 60, 'Completed'),
(10, 4, 10, '2024-01-15', '17:00:00', 'Online', 'Problemas de Pareja', 60, 'Completed'),

(11, 1, 1, '2024-02-01', '09:00:00', 'Online', 'Ansiedad', 60, 'Completed'),
(12, 1, 2, '2024-02-02', '10:00:00', 'Presencial', 'Depresión', 60, 'Completed'),
(13, 2, 3, '2024-02-05', '14:00:00', 'Online', 'TDAH', 60, 'Completed'),
(14, 3, 4, '2024-02-06', '15:00:00', 'Presencial', 'Estrés Laboral', 60, 'Completed'),
(15, 4, 5, '2024-02-07', '16:00:00', 'Online', 'Problemas de Pareja', 60, 'Completed'),
(16, 5, 6, '2024-02-08', '11:00:00', 'Online', 'Ansiedad', 60, 'Completed'),
(17, 1, 7, '2024-02-09', '13:00:00', 'Presencial', 'Autoestima', 60, 'Completed'),
(18, 2, 8, '2024-02-12', '09:00:00', 'Online', 'Problemas de Conducta', 60, 'Completed'),
(19, 3, 9, '2024-02-13', '14:00:00', 'Presencial', 'Coaching Ejecutivo', 60, 'Completed'),
(20, 4, 10, '2024-02-14', '17:00:00', 'Online', 'Problemas de Pareja', 60, 'Completed'),

(21, 1, 1, '2024-03-01', '09:00:00', 'Online', 'Ansiedad', 60, 'Completed'),
(22, 1, 2, '2024-03-04', '10:00:00', 'Presencial', 'Depresión', 60, 'Completed'),
(23, 2, 3, '2024-03-05', '14:00:00', 'Online', 'TDAH', 60, 'Completed'),
(24, 3, 4, '2024-03-06', '15:00:00', 'Presencial', 'Estrés Laboral', 60, 'Completed'),
(25, 4, 5, '2024-03-07', '16:00:00', 'Online', 'Problemas de Pareja', 60, 'Completed'),
(26, 5, 6, '2024-03-08', '11:00:00', 'Online', 'Ansiedad', 60, 'Completed'),
(27, 1, 7, '2024-03-11', '13:00:00', 'Presencial', 'Autoestima', 60, 'Completed'),
(28, 2, 8, '2024-03-12', '09:00:00', 'Online', 'Problemas de Conducta', 60, 'Completed'),
(29, 3, 9, '2024-03-13', '14:00:00', 'Presencial', 'Coaching Ejecutivo', 60, 'Completed'),
(30, 4, 10, '2024-03-14', '17:00:00', 'Online', 'Problemas de Pareja', 60, 'Completed'),

-- ============================================================================
-- ANÁLISIS DE DATOS
-- ============================================================================

-- 1. ¿Qué temática es más consultada?
SELECT 
    tematica,
    COUNT(*) as total_sesiones,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM sesiones WHERE estado = 'Completed'), 2) as porcentaje
FROM sesiones 
WHERE estado = 'Completed'
GROUP BY tematica 
ORDER BY total_sesiones DESC;

-- 2. ¿Qué día tiene más sesiones?
SELECT 
    DAYNAME(fecha) as dia_semana,
    COUNT(*) as total_sesiones,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM sesiones WHERE estado = 'Completada'), 2) as porcentaje
FROM sesiones 
WHERE estado = 'Completed'
GROUP BY DAYNAME(fecha)
ORDER BY total_sesiones DESC;

-- 3. ¿Qué modalidad es más usada?
SELECT 
    modalidad,
    COUNT(*) as total_sesiones,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM sesiones WHERE estado = 'Completed'), 2) as porcentaje
FROM sesiones 
WHERE estado = 'Completed'
GROUP BY modalidad 
ORDER BY total_sesiones DESC;
