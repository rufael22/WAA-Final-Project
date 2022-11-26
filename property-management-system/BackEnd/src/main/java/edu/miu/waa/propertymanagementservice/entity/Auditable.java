package edu.miu.waa.propertymanagementservice.entity;

import java.time.LocalDateTime;

public interface Auditable {

    void setCreatedDate(LocalDateTime dateTime);

    void setCreatedBy(String user);

    void setUpdatedDate(LocalDateTime dateTime);

    void setUpdatedBy(String user);

    void setDeletedBy(String user);

    void setDeletedDate(LocalDateTime dateTime);
}

