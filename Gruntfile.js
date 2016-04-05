module.exports = function(grunt) {

  grunt.initConfig({
    babel: {
        options: {
            sourceMap: true,
            presets:["es2015","stage-0"],
            "plugins": [
//              "syntax-class-properties",
  //            "transform-class-properties",
              "transform-decorators-legacy",
              "transform-es2015-modules-systemjs",
            ]
        },
        dist: {
          files: [{
              expand: true,
              cwd: 'src/js/',
              src: ['**/*.js'],
              dest: 'dist/js',
              ext: '.js'
          }],
          
        }
    },
     jsdoc : {
        dist : {
            src: ['src/**/*.js', 'test/**/*.js'],
            options: {
                destination: 'doc'
            }
        }
    },
    clean:{
      build:{
        src:['dist', "doc"]
      }
    },
    watch: {
      files: 'src/js/**/*.js',
      tasks: ['babel']
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.registerTask('build', ['babel']);
  grunt.registerTask('default', ['babel']);
};

