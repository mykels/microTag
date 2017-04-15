package micro.tag.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import micro.tag.core.services.file.FileWriter;
import micro.tag.core.services.json.JsonSerializer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

@RestController
@CrossOrigin
public class ImageController {
	private static final Logger logger = LogManager.getLogger(ImageController.class);
	private final JsonSerializer jsonSerializer;
	private final micro.tag.core.services.file.FileReader fileReader;
	private FileWriter fileWriter;
	private Environment env;

	private ObjectNode deviceSettings;

	@Autowired
	public ImageController(JsonSerializer jsonSerializer,
	                       micro.tag.core.services.file.FileReader fileReader,
	                       FileWriter fileWriter,
	                       Environment env) {
		this.jsonSerializer = jsonSerializer;
		this.fileReader = fileReader;
		this.fileWriter = fileWriter;
		this.env = env;
	}


	@PostConstruct
	public void onInit() {
		logger.info("==== ImageController is initialized ====");
	}

	@RequestMapping(value = "/image/{imageName}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
	@ResponseBody
	public byte[] getImage(@PathVariable String imageName) throws IOException {
		logger.info("Getting image " + imageName + " ...");
		if (!imageName.endsWith(".jpg")) {
			imageName += ".jpg";
		}

		String imagePath = env.getProperty("resource.path") + File.separator + "images" + File.separator + imageName;
		return extractBytes(imagePath);
	}

	private byte[] extractBytes(String imagePath) throws IOException {
		File imageFile = new File(imagePath);
		java.awt.image.BufferedImage originalImage = ImageIO.read(imageFile);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ImageIO.write(originalImage, "jpg", baos);
		ByteArrayOutputStream b = new ByteArrayOutputStream();
		baos.writeTo(b);
		b.close();
		return b.toByteArray();
	}

}
