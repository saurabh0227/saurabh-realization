const { Schema, Types, model } = require('mongoose');

const AudienceSchema = Schema(
  {
    active: { type: Boolean, default: true },
    classId: { type: Types.ObjectId, ref: 'Class', default: null },
    studentId: { type: Types.ObjectId, ref: 'User', default: null },
    inTime: { type: Date, default: null },
    outTime: { type: Date, default: null },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  }
);

module.exports = model('Audience', AudienceSchema);
