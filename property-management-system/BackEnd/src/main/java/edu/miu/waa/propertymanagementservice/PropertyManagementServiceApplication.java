package edu.miu.waa.propertymanagementservice;


import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
//@ConfigurationPropertiesScan("edu.miu.waa.propertymanagementservice.constant")
@EnableCaching
@EnableScheduling
@EnableAsync
public class PropertyManagementServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PropertyManagementServiceApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
