package micro.tag.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import micro.tag.core.services.http.ResponseWrapperBuilder;
import micro.tag.core.services.json.JsonSerializer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;

@RestController
@CrossOrigin
public class TerminalController {
	private static final Logger logger = LogManager.getLogger(TerminalController.class);
	private final JsonSerializer jsonSerializer;

	@Autowired
	public TerminalController(JsonSerializer jsonSerializer) {
		this.jsonSerializer = jsonSerializer;
	}

	@PostConstruct
	public void onInit() {
		logger.info("==== TerminalController is initialized ====");
	}

	@RequestMapping(path = "/terminal/execute/{command}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity execute(@PathVariable String command) throws InterruptedException {
		logger.info("executing command {}", command);

		JsonNode output = executeCommand(command);

		return jsonSerializer.toJson(ResponseWrapperBuilder.of(output).build())
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.badRequest().body(null));
	}

	private JsonNode executeCommand(String command) throws InterruptedException {
		com.fasterxml.jackson.databind.node.ObjectNode output = new com.fasterxml.jackson.databind.node.ObjectNode(JsonNodeFactory.instance);
		output.put("command", command);

		if (command.equalsIgnoreCase("ipconfig")) {
			output.put("output", "Windows IP Configuration\n" +
					"\n" +
					"\n" +
					"Ethernet adapter Local Area Connection:\n" +
					"\n" +
					"   Connection-specific DNS Suffix  . : Home\n" +
					"   Link-local IPv6 Address . . . . . : fe80::a822:24b1:d261:fba5%6\n" +
					"   IPv4 Address. . . . . . . . . . . : 10.0.0.1\n" +
					"   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n" +
					"   Default Gateway . . . . . . . . . : 10.0.0.138\n" +
					"\n" +
					"Ethernet adapter VMware Network Adapter VMnet1:\n" +
					"\n" +
					"   Connection-specific DNS Suffix  . :\n" +
					"   Link-local IPv6 Address . . . . . : fe80::4934:3e1f:c366:caed%19\n" +
					"   IPv4 Address. . . . . . . . . . . : 192.168.223.1\n" +
					"   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n" +
					"   Default Gateway . . . . . . . . . :\n" +
					"\n" +
					"Ethernet adapter VMware Network Adapter VMnet8:\n" +
					"\n" +
					"   Connection-specific DNS Suffix  . :\n" +
					"   Link-local IPv6 Address . . . . . : fe80::e9d4:8b58:ff0e:1b55%12\n" +
					"   IPv4 Address. . . . . . . . . . . : 192.168.132.1\n" +
					"   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n" +
					"   Default Gateway . . . . . . . . . :\n" +
					"\n" +
					"Tunnel adapter isatap.Home:\n" +
					"\n" +
					"   Media State . . . . . . . . . . . : Media disconnected\n" +
					"   Connection-specific DNS Suffix  . : Home\n" +
					"\n" +
					"Tunnel adapter Local Area Connection* 10:\n" +
					"\n" +
					"   Media State . . . . . . . . . . . : Media disconnected\n" +
					"   Connection-specific DNS Suffix  . :\n" +
					"\n" +
					"Tunnel adapter isatap.{FAE64E76-4CE5-4E6F-9D0B-36F49FE24F6F}:\n" +
					"\n" +
					"   Media State . . . . . . . . . . . : Media disconnected\n" +
					"   Connection-specific DNS Suffix  . :\n" +
					"\n" +
					"Tunnel adapter isatap.{BD42B3DA-2424-4F83-8A1C-9FA00FC14F1B}:\n" +
					"\n" +
					"   Media State . . . . . . . . . . . : Media disconnected\n" +
					"   Connection-specific DNS Suffix  . :");
			output.put("isError", false);
		} else {
			output.put("output",
					String.format("\"%s\" is not recognized as an internal or external command", command));
			output.put("isError", true);
		}

		Thread.sleep(2000);
		return output;
	}
}
