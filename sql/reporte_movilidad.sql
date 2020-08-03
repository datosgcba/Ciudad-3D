create view reporte_movilidad_json
            (fecha, viajes_colectivo, variacion_colectivo, viajes_tren, variacion_tren, viajes_subte, variacion_subte,
             vehiculos_ingreso, variacion_ingreso, vehiculos_egreso, variacion_egreso, vehiculos_internos,
             variacion_interna)
as
SELECT (SELECT to_char(dataset_viajes_sube.dia, 'DD-MM-YYYY'::text) AS to_char
        FROM dataset_viajes_sube
        ORDER BY dataset_viajes_sube.dia DESC
        LIMIT 1)                                                  AS fecha,
       (SELECT dataset_viajes_sube.cantidad::integer AS cantidad
        FROM dataset_viajes_sube
        WHERE dataset_viajes_sube.tipo_transporte::text = 'Colectivo'::text
        ORDER BY dataset_viajes_sube.dia DESC
        LIMIT 1)                                                  AS viajes_colectivo,
       (SELECT dataset_sube_colectivo_variacion_dia.dato
        FROM dataset_sube_colectivo_variacion_dia
        ORDER BY dataset_sube_colectivo_variacion_dia.fecha DESC) AS variacion_colectivo,
       (SELECT dataset_viajes_sube.cantidad::integer AS cantidad
        FROM dataset_viajes_sube
        WHERE dataset_viajes_sube.tipo_transporte::text = 'Tren'::text
        ORDER BY dataset_viajes_sube.dia DESC
        OFFSET 1 LIMIT 1)                                         AS viajes_tren,
       (SELECT dataset_sube_ffcc_variacion_dia.dato
        FROM dataset_sube_ffcc_variacion_dia
        ORDER BY dataset_sube_ffcc_variacion_dia.fecha DESC)      AS variacion_tren,
       (SELECT dataset_viajes_sube.cantidad::integer AS cantidad
        FROM dataset_viajes_sube
        WHERE dataset_viajes_sube.tipo_transporte::text = 'Subte'::text
        ORDER BY dataset_viajes_sube.dia DESC
        LIMIT 1)                                                  AS viajes_subte,
       (SELECT dataset_sube_subte_variacion_dia.dato
        FROM dataset_sube_subte_variacion_dia
        ORDER BY dataset_sube_subte_variacion_dia.fecha DESC)     AS variacion_subte,
       (SELECT dataset_flujo_vehicular.cantidad::integer AS cantidad
        FROM dataset_flujo_vehicular
        WHERE dataset_flujo_vehicular.sentido::text = 'Ingreso'::text
        ORDER BY dataset_flujo_vehicular.hora DESC
        LIMIT 1)                                                  AS vehiculos_ingreso,
       vingreso.dato                                              AS variacion_ingreso,
       (SELECT dataset_flujo_vehicular.cantidad::integer AS cantidad
        FROM dataset_flujo_vehicular
        WHERE dataset_flujo_vehicular.sentido::text = 'Egreso'::text
        ORDER BY dataset_flujo_vehicular.hora DESC
        LIMIT 1)                                                  AS vehiculos_egreso,
       vegreso.dato                                               AS variacion_egreso,
       (SELECT dataset_flujo_vehicular.cantidad::integer AS cantidad
        FROM dataset_flujo_vehicular
        WHERE dataset_flujo_vehicular.sentido::text = 'Interna'::text
        ORDER BY dataset_flujo_vehicular.hora DESC
        LIMIT 1)                                                  AS vehiculos_internos,
       vinterna.dato                                              AS variacion_interna
FROM dataset_flujo_interna_variacion_dia vinterna
         JOIN dataset_flujo_egreso_variacion_dia vegreso ON vinterna.fecha = vegreso.fecha
         JOIN dataset_flujo_ingreso_variacion_dia vingreso ON vinterna.fecha = vingreso.fecha;