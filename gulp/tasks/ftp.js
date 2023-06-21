import { configFTP } from "../config/ftp.js";
import vinylFTP from "vinyl-ftp";


export const ftp = () => {
    // configFTP.log = unit.log;
    const ftpConnect = vinylFTP.create(configFTP);
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FTP",
                messager: "Error: <%= error.message %>"
            })
        ))



        .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
}
