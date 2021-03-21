const { Schema, Types, model } = require('mongoose');

const ClassSchema = Schema(
  {
    active: { type: Boolean, default: true },
    name: { type: String, default: null },
    teacherId: { type: Types.ObjectId, ref: 'User', default: null },
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  }
);

module.exports = model('Class', ClassSchema);
