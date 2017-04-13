package micro.tag.main;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;

@SpringBootApplication
@ComponentScan({
		"micro.tag.controllers",
		"micro.tag.config",
		"micro.tag.core.services"
})
@PropertySource({"file:${config.path}/application.properties"})
public class Bootstrapper {
	private static final Logger logger = LogManager.getLogger(Bootstrapper.class);

	@Autowired
	Environment env;

	public static void main(String[] args) {
		SpringApplication.run(Bootstrapper.class, args);
	}

	@PostConstruct
	public void onInit() {
		logger.info("========|System is initialized|========");
	}
}
