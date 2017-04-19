import app from './';

after(function(done) {
  app.on('app_start', () => {
    app.shy.on('close', () => done());
    app.shy.close();
  });
});