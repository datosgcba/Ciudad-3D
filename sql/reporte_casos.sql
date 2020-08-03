create view reporte_casos_json
            (fecha, casos_dia_residentes, altas_dia_residentes, fallecidos_dia_residentes, hisopados_diarios,
             hisopados_positivos_diario, grafico, casos_totales_residentes, altas_totales_residentes,
             fallecidos_totales_residente, hisopados_totales, hisopados_positivos_totales, letalidad,
             edad_promedio_fallecidos)
as
SELECT to_char(positivos.fecha::timestamp with time zone, 'DD-MM-YYYY'::text)                           AS fecha,
       positivos.eje_y                                                                                  AS casos_dia_residentes,
       altas.eje_y                                                                                      AS altas_dia_residentes,
       frd.eje_y                                                                                        AS fallecidos_dia_residentes,
       htd.dato                                                                                         AS hisopados_diarios,
       hpd.eje_y                                                                                        AS hisopados_positivos_diario,
       'https://bamapas.usig.buenosaires.gob.ar/render_indicador/sisa_confirmados_fecha_hisopado'::text AS grafico,
       pra.dato                                                                                         AS casos_totales_residentes,
       ara.dato                                                                                         AS altas_totales_residentes,
       far.dato                                                                                         AS fallecidos_totales_residente,
       hpa.eje_y                                                                                        AS hisopados_totales,
       hta.eje_y                                                                                        AS hisopados_positivos_totales,
       let.dato                                                                                         AS letalidad,
       (SELECT dataset_sisa_promedio_fallecidos.dato2
        FROM dataset_sisa_promedio_fallecidos
        ORDER BY dataset_sisa_promedio_fallecidos.fecha DESC
        LIMIT 1)                                                                                        AS edad_promedio_fallecidos
FROM dataset_positivos_residentes_dia positivos
         JOIN altas_residentes_dia altas ON altas.fecha = positivos.fecha
         JOIN fallecidos_residentes_dia frd ON altas.fecha = frd.fecha
         JOIN dataset_sisa_hisopados_totales_dia htd ON altas.fecha = htd.fecha
         JOIN dataset_sisa_hisopados_positivos_dia hpd ON altas.fecha = hpd.fecha
         JOIN dataset_positivos_residentes_acumulado pra ON altas.fecha = pra.fecha
         JOIN dataset_altas_residentes_acumulado ara ON altas.fecha = ara.fecha
         JOIN dataset_fallecidos_acumulados_residentes far ON htd.fecha = far.fecha
         JOIN dataset_sisa_hisopados_positivos_acumulado hpa ON far.fecha = hpa.fecha
         JOIN dataset_sisa_hisopados_totales_acumulado hta ON altas.fecha = hta.fecha
         JOIN dataset_sisa_letalidad let ON altas.fecha = let.fecha
ORDER BY (to_char(positivos.fecha::timestamp with time zone, 'DD-MM-YYYY'::text)) DESC
LIMIT 1;