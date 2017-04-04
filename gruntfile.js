
rts = function (grunt) {

  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     cssmin: {
       minify: {
         options: {
           banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
         },
         expand: true,
         src: ['*.css', '!*.min.css'],
         dest: 'dist/',
         ext: '.min.css'
       }
     },
     uglify: {
       options: {
         banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
       },
       build: {
         src: 'index.js',
         dest: 'dist/index.min.js'
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

     clean: ['dist*//*.min.*']
   });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['cssmin','uglify', 'processhtml', 'htmlmin','clean']);
  grunt.registerTask('build', ['cssmin','uglify', 'htmlmin', 'processhtml']);
};
