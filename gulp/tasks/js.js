// import webpack from "webpack-stream";
import include from "gulp-include";

export const js = () => {
	return app.gulp.src(app.path.src.js, { sourcemaps: true })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "JS",
				messager: "Error: <%= error.message %>"
			})
		))
		.pipe(include())
		.on('error', console.log)
		// .pipe(fileInclude())
		// .pipe(webpack({
		// 	mode: 'development',
		// 	output: {
		// 		filename: 'scripts.min.js',
		// 	}
		// }))

		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream());
}
