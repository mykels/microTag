package micro.tag.core.services.file;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class ZipCreator {
	private static final Logger logger = LogManager.getLogger(ZipCreator.class);

	@PostConstruct
	public void onInit() {
		logger.info("==== ZipCreator is initialized ====");
	}

	public File create(List<File> files, String name) throws Exception {
		File zipFile = new File(name);

		byte[] buffer = new byte[1024];
		try {
			FileOutputStream fos = new FileOutputStream(zipFile);
			ZipOutputStream zos = new ZipOutputStream(fos);

			for (File file : files) {
				FileInputStream in = null;
				try {
					if (file.isDirectory())
						continue;

					in = new FileInputStream(file);
					String relativePath = new File("").toURI().relativize(file.toURI()).toString();
					relativePath = URLDecoder.decode(relativePath, "UTF-8");
					ZipEntry zipEntry = new ZipEntry(relativePath);
					zos.putNextEntry(zipEntry);

					int len;
					while ((len = in.read(buffer)) > 0)
						zos.write(buffer, 0, len);

					zos.closeEntry();
				} catch (Exception e) {
					logger.warn("Error occurred while adding entry to zip file, " +
							"see causing exception: " + e.getLocalizedMessage());
				} finally {
					if (in != null) {
						try {
							in.close();
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}

			zos.close();
			fos.close();


		} catch (IOException e) {
			logger.error("Error in zip method : " + e.getMessage());
		}

		return zipFile;
	}
}
