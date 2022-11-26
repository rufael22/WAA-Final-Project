package edu.miu.waa.propertymanagementservice.domain;

public enum VisitType {

    IN_PERSON("In Person"), VIDEO_CHAT("Video Chat");
    private String val;

    VisitType(String val) {
        this.val = val;
    }

    public String value() {
        return val;
    }
}
