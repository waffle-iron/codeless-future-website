module.exports = function (grunt) {

  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     cssmin: {
       minify: {
         expand: true,
         src: ['css/*.css'],
         dest: 'dist/'
       }
     },
     uglify: {
       build: {
         expand: true,
         src: ['js/*.js'],
         dest: 'dist/',
       }
     },
     processhtml: {
       dist: {
         options: {
           process: true,
           data: {
             title: 'My app',
             message: 'This is production distribution'
           }
         },
         files: {
           'dist/index.min.html': ['index.html']
         }
       }
     },
     htmlmin: {
       dist: {
         options: {
           removeComments: true,
           collapseWhitespace: true
         },
         files: {
           'dist/index.html': 'dist/index.min.html'
         }
       }
    },
    imagemin: {                          // Task
    dynamic: {                         // Another target
      files: [{
        expand: true,                  // Enable dynamic expansion
        cwd: 'img',                   // Src matches are relative to this path
        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
        dest: 'dist/img'                  // Destination path prefix
      }]
    }
},
copy: {
  main: {
    expand: true,
    src: ['css/fonts/*','CNAME','img/favicon.ico'],
    dest: 'dist/',
  },
},

     clean: ['dist*//*.min.*']
 });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['cssmin','uglify', 'processhtml', 'htmlmin','imagemin','copy','clean']);
  grunt.registerTask('build', ['cssmin','uglify', 'htmlmin', 'processhtml']);
};
