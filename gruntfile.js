module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none',
                    noCache: true
                },
                files: {
                    "scss/build/style.css": "scss/style.scss"
                }
            }
        },

        tinypng: {
            options: {
                apiKey: "VrBjlZ8fgzFk7Jd06SsVfg6wVjAHf4Wt", // Get your own API please, https://tinypng.com/developers
                checkSigs: true,
                sigFile: 'images/file_sigs.json',
                summarize: true,
                showProgress: true,
                stopOnImageError: true
            },
            compress_png: {
                expand: true,
                src: ['images/*.png', '!*.min.png'],
                dest: '',
                ext: '.min.png'
            },
            compress_jpg: {
                expand: true,
                src: ['images/*.jpg', '!*.min.jpg'],
                dest: '',
                ext: '.min.jpg'
            }
        },

        uncss: {
            dist: {
                files: {
                    'uncss/style.css': ['index.html']
                }
            }
        },

        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'uncss',
              src: ['*.css', '!*.min.css'],
              dest: 'uncss',
              ext: '.min.css'
            }]
          }
        },

        inlinecss: {
            main: {
                options: {
                },
                files: {
                    'index.html': 'index.html'
                }
            }
        },

        watch: {
            options: {
                livereload: false,
            },
            styles: {
                files: ['scss/**/*.scss'], // which files to watch
                tasks: ['sass'],
                options: {
                    nospawn: true
                }
            },
            tinypng: {
                files: ['images/*.png','images/*.jpg'],
                tasks: ["tinypng"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-tinypng');
    grunt.loadNpmTasks('grunt-criticalcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-inline-css');

    grunt.registerTask('small-css',  ['uncss', 'cssmin', 'inlinecss']);
};
