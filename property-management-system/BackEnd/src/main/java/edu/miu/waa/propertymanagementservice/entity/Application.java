package edu.miu.waa.propertymanagementservice.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EntityListeners(AuditListener.class)
public class Application implements Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private User customer;

    @ManyToOne
    private User owner;

    private String content;

    // ======== Audit ===============
    private LocalDateTime createdDate;

    private String createdBy;

    private String deletedBy;

    private LocalDateTime deletedDate;

    private LocalDateTime updatedDate;

    private String updatedBy;
}
