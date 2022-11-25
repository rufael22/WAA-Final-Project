package edu.miu.waa.propertymanagementservice.domain;

import lombok.Data;

import java.util.Map;

@Data
public class EmailDetail {

    private String recipient;

    private Map<String, String> content;
}
