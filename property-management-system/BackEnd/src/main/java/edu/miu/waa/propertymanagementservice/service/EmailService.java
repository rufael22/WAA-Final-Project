package edu.miu.waa.propertymanagementservice.service;

public interface EmailService {

    void send(String recipient, String title, String content);
}
