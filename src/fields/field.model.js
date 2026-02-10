'use strict';

import mongoose from "mongoose";

const fieldSchema = mongoose.Schema(
    {
        fieldName: {
            type: String,
            required: [true, 'El nombre del campo es requerido'],
            trim: true,
            maxLenght: [100, 'El nombre no puede exceder 100 caracteres'],
        },
        fieldType: {
            type: String,
            required: [true, 'El tipo de campo es requerido'],
            enum: {
                values: ['NATURAL', 'SINTETICA', 'CONCRETA'],
                message: 'Tipo de superficie no valida',
            },
        },
        capacity: {
            type: String,
            required: [true, 'La capacidad es requerida'],
            enum: {
                values: ['FUTBOL_5', 'FUTBOL_7', 'FUTBOL_11'],
                message: 'Capacidad no valida'
            }
        },
        pricePerHour: {
            type: Number,
            required: [true, 'El precio por hora es requerida'],
            min: [0, 'El precio debe ser mayor o igual a 0'],
        },
        description: {
            type: String,
            trim: true,
            maxLenght: [500, 'Ladescriopcion no puede exceder 500 caracteres']
        },
        photo: {
            type: String,
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        varsionkey: false
    }
)

fieldSchema.index({isActive: 1});
fieldSchema.index({fieldType: 1});
fieldSchema.index({isActive: 1, fieldaType: 1});

export default mongoose.model('field', fieldSchema);