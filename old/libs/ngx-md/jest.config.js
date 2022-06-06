module.exports = {
  name: 'ngx-md',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngx-md',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
