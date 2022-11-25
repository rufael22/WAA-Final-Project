package edu.miu.waa.propertymanagementservice.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@EntityListeners(AuditListener.class)
public class User implements Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable
    private Set<Role> roles;

    private String password;

    private String firstName;

    private String lastName;

    @ManyToMany
    @JoinTable(name = "favorite_properties_users",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name="property_id")})

    private Set<Property> favoriteProperties;

    @OneToMany(mappedBy = "owner")
    private Set<Property> properties;

    @OneToMany(mappedBy = "owner")
    private Set<Application> ownerApplications;

    @OneToMany(mappedBy = "customer")
    private Set<Application> customerApplications;

    // ======== Audit ===============
    private LocalDateTime createdDate;

    private String createdBy;

    private String deletedBy;

    private LocalDateTime deletedDate;

    private LocalDateTime updatedDate;

    private String updatedBy;
}
