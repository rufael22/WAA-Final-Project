-- USERS
INSERT INTO users(email, password, first_name, last_name)
VALUES
    ('rufaelyohannes@miu.edu', '$2a$10$u5xPEnqTU3lcPPItCotEf./kp4k2zj4Q9Mnko5W4nBca4pvhLs7Zq', 'Rufael', 'Yohannes'),
    ('sirakAbbai@gamil.com', '$2a$10$u5xPEnqTU3lcPPItCotEf./kp4k2zj4Q9Mnko5W4nBca4pvhLs7Zq', 'sirak', 'Abbai'),
    ('AlemHagos@gmail.com', '$2a$10$u5xPEnqTU3lcPPItCotEf./kp4k2zj4Q9Mnko5W4nBca4pvhLs7Zq', 'Alem', 'Hagos'),
    ('Frena@gmail.com', '$2a$10$u5xPEnqTU3lcPPItCotEf./kp4k2zj4Q9Mnko5W4nBca4pvhLs7Zq', 'Frena', 'Mehretab'),
    ('Selam@gmail.com', '$2a$10$u5xPEnqTU3lcPPItCotEf./kp4k2zj4Q9Mnko5W4nBca4pvhLs7Zq', 'Selam', 'Tesfalem'),
    ('rafi@gmail.com', '$2a$10$u5xPEnqTU3lcPPItCotEf./kp4k2zj4Q9Mnko5W4nBca4pvhLs7Zq', 'Rufael', 'Yohannes');

-- ROLE
INSERT INTO role(role)
VALUES
    ('OWNER'),
    ('CUSTOMER');

-- USERS_ROLES
INSERT INTO users_roles(user_id, roles_id)
VALUES
    (1, 2),
    (2, 1),
    (3, 1),
    (4, 2),
    (5, 1),
    (6, 1);

-- PROPERTY

INSERT INTO property(price, num_of_room, property_type, home_type, overview, street, city, zip_code, listed, deleted, available_date, owner_id, pictures, created_date, views)
VALUES
    (900, 3, 'RENT', 'APARTMENT', 'You have a vision for your future, and you can begin to live it when you come home to Alta Roosevelt. Our apartments offer expansive windows, private balconies, and pristine quartz countertops, as well as the technology you need to live.', '900 North 12th Street', 'Fairfield', '56556', true, false, CURRENT_DATE, 1,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/94565dbbf813f2fe9c2efdf976f9b401-cc_ft_960.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-27', 1),

    (300000, 2, 'SELL', 'CONDO', 'Experience a new era at Lake & Wells. Century Tower, a Chicago landmark for nearly 100 years, is the best place to begin and end your day.', '111 North 11th Street', 'Des Moines', '50009', true, false, CURRENT_DATE, 1,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house2.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-26', 2),

    (800, 2, 'RENT', 'HOUSE', 'The best apartment in the US', '222 South 10th Street', 'Fairfield', '56556', true, false, CURRENT_DATE, 6,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house3.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-25', 3),

    (100000, 3, 'SELL', 'HOUSE', 'With newly-renovated or classic apartment designs in studio, one, two, and three bedroom floor plans, there is an apartment for every lifestyle. In addition to our rooftop deck and convenient on-site dry cleaning with Pressbox.', '333 North 9th Street', 'Iowa', '52556', true, false, CURRENT_DATE, 2,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house4.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-24', 4),

    (1000, 3, 'RENT', 'HOUSE', 'The best apartment in the US', '444 North 8th Street', 'Fairfield', '56556', true, false, CURRENT_DATE, 5,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/94565dbbf813f2fe9c2efdf976f9b401-cc_ft_960.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-23', 5),

    (5000, 3, 'RENT', 'APARTMENT', 'Hubbard Place is the newest luxury rental residence with exceptional views of the city. Over-sized windows and rich grey Eligna oak flooring create an urban chic aesthetic, with private balconies perfect for entertaining friends.', '4 North 8th Street', 'New York', '12345', true, false, CURRENT_DATE, 2,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house3.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-22', 6),

    (2500, 3, 'RENT', 'APARTMENT', 'We began with the goal to create a place thats special. By focusing on thousands of little details, weve created something big: an entirely new way to live in Streeterville. Open the door to any one of our residences.', '2 Burlington Street', 'Chicago', '56556', true, false, CURRENT_DATE, 4,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/94565dbbf813f2fe9c2efdf976f9b401-cc_ft_960.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-21', 7),

    (3000, 3, 'RENT', 'HOUSE', 'Andersonville is a charming suburb within West Edgewater in the city of Chicago. This laid-back neighborhood sits just off Lake Michigan and is lined with 19th-century row houses, antique shops, cafes, and unique businesses along Clark Street.', '5425 N Clark St.', 'Chicago', '60640', true, false, CURRENT_DATE, 2,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house4.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-20', 8),

    (2500, 2, 'RENT', 'HOUSE', 'Located on North Sheridan Road in Uptown, Chicago, Somerset Place Apartments is a completely renovated 160 unit building that will be opening in the summer of 2014.', '5009 N Sheridan Rd', 'Chicago', '60640', true, false, CURRENT_DATE, 1,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house2.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-19', 9),

    (4000, 4, 'RENT', 'HOUSE', 'Discover your new home at SCIO at Medical District Apartments in West Loop! We offer a variety of floor plans that include studios, one and two-bedroom units, so you can choose the floor plan that exactly fits your needs.', '901 S Ashland Ave', 'Chicago', '60640', true, false, CURRENT_DATE, 4,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house3.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-18', 10),

    (5000, 6, 'RENT', 'HOUSE', 'Make your home address one of the most desirable locations in Chicago. 850 Lake Shore Drive honors the prestige of Chicago''s historic Beaux-Arts legacy with world-class residences.', '850 N Lake Shore Dr', 'Chicago', '60640', true, false, CURRENT_DATE, 2,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/94565dbbf813f2fe9c2efdf976f9b401-cc_ft_960.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-17', 11),

    (2800, 3, 'RENT', 'HOUSE', 'One East Delaware fuses chic new finishes with timeless design to capture the distinctive spirit of the Gold Coast. Newly-renovated apartments include private balconies, designer inspired kitchens and baths and attractive wide-plank flooring.', '1 E Delaware Pl', 'Chicago', '60640', true, false, CURRENT_DATE, 3,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house3.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-16', 12),

    (2900, 3, 'RENT', 'HOUSE', 'Grand Plaza Chicago offers an incredible location where comfort meets downtown luxury; welcome to our upscale Chicago River North apartments. Homes here range from elegant studios to sophisticated penthouses, all of which offer stunning amenities.', '540 N State St', 'Chicago', '60640', true, false, CURRENT_DATE, 5,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house3.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-15', 13),

    (3100, 3, 'RENT', 'HOUSE', 'The Cooper is Southbanks first residential highrise, located on the South Branch of the Chicago River. Inspired by our citys relentless creative energy, The Cooper offers modern residences with a unique perspective on living.', '720 S Wells St', 'Chicago', '60640', true, false, CURRENT_DATE, 6,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/94565dbbf813f2fe9c2efdf976f9b401-cc_ft_960.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-14', 14),

    (5200, 1, 'RENT', 'APARTMENT', 'Amenities such as the outdoor terrace with gas grills, business center, fitness center, demo kitchen and billiard table create a wonderful living space for residents.', '10 Santa Monica Blvd', 'Los Angeles', '90038', true, false, CURRENT_DATE, 2,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house2.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-13', 15),

    (800000, 2, 'SELL', 'HOUSE', 'The best apartment in the USOrion Housing has a brand new building coming live this August! Enjoy a luxurious lifestyle right on Vermont and Adams. Our fully furnished premium units come with brand-new appliances and big living rooms.', '635 Burnett Ave', 'Los Angeles', '90039', true, false, CURRENT_DATE, 2,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house3.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-12', 16),

    (1000000, 3, 'SELL', 'APARTMENT', 'Come and preview this luxury apartment in a gated community. This Totally remodeled apartment is spacious and luxurious with new up-grated fixtures and appliances. The apartment has been newly painted with 3-tone accent paint.', '55 Santa Monica Blvd', 'Los Angeles', '90038', true, false, CURRENT_DATE, 2,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/94565dbbf813f2fe9c2efdf976f9b401-cc_ft_960.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-11', 17),

    (3500, 3, 'RENT', 'APARTMENT', 'Introducing Cascade, a 37-story crystaline tower designed by bKL architects and developed by Lendlease and Magellan. Offering studio to 3-bedroom apartment homes and overflowing with more than 45,000 square feet of amenity space.', '16 Hoffman Ave', 'Los Angeles', '90038', true, false, CURRENT_DATE, 5,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house2.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-10', 18),

    (1100000, 3, 'SELL', 'APARTMENT', ' From our virtual concierge desk to our dry cleaning and tailoring services, we can see to your every need. Onsite management can deal with any issue quickly and professionally, and our 24-hour door staff will ensure you feel safe.', '3520 20th St APT 11', 'San Francisco', '20000', true, false, CURRENT_DATE, 6,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/94565dbbf813f2fe9c2efdf976f9b401-cc_ft_960.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-09', 19),

    (4000, 3, 'RENT', 'APARTMENT', 'The apartment has a front yard and a back yard. There is also a small yard between every two buildings.', '834 Castro St APT 4', 'San Francisco', '20001', true, false, CURRENT_DATE, 1,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house3.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-08', 20),

    (2500, 1, 'RENT', 'APARTMENT', 'This community offers you a selection of features. Find your new home at Garland City Lights. Section8 voucher holder are welcome to apply. For more properties like this visit Affordable Housing.', '1532 Harrison St', 'San Francisco', '20000', true, false, CURRENT_DATE, 3,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/94565dbbf813f2fe9c2efdf976f9b401-cc_ft_960.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-07', 21),

    (2000, 5, 'RENT', 'HOUSE', 'Available for RENT BY ROOM. Large House Completely Remodeled in 2022! Larger than average bedrooms, with extremely spacious and open living and dining room area to entertain a group of tenants. NEWLY REMODELED for HIGH QUALITY LIVING!', '1585 W 35th Pl', 'Fairfield', '50000', true, false, CURRENT_DATE, 5,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house2.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-06', 22),

    (2500, 5, 'RENT', 'HOUSE', 'University Gateway Apartments are just steps from campus and offer USC students high-end features and A-List Amenities at a great price. Our apartments feature modern furniture packages, captivating views, designer flooring, flat screen TVs.', 'Casa Grande, 13518 Yukon Ave', 'Fairfield', '50000', true, false, CURRENT_DATE, 4,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/94565dbbf813f2fe9c2efdf976f9b401-cc_ft_960.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-05', 23),

    (850, 6, 'RENT', 'APARTMENT', 'Plank flooring.  new quartz countertop, new windows, stainless steel stove and fridge, get $500 off 1st month rent on approved credit', '14427 Cerise Ave', 'Fairfield', '50001', true, false, CURRENT_DATE, 6,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house4.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-04', 24),

    (3000, 2, 'RENT', 'APARTMENT', 'The entire unit has been gutted and everything is brand new. Brand new bathrooms, kitchen, flooring, electrical, appliances (washer/dryer included), individualized ductless AC/Heater per room, closets.....', '4702 W 17th St #26', 'Dallas', '56556', true, false, CURRENT_DATE, 3,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house3.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-03', 25),

    (3500, 3, 'RENT', 'APARTMENT', 'Truly a unique property. Fully Furnished with Tulum finishings, to give you that wonderful beach/vacation style living while in school. Relax in this oasis everyday, with peace of mind. Includes Parking!', '831-837 S Grand View St #208', 'Dallas', '56556', true, false, CURRENT_DATE, 3,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house4.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-02', 26),

    (3300, 3, 'RENT', 'APARTMENT', 'These lavish new construction residences in West Logan Square/Avondale blend the best of city and family life. These stunning townhomes and new construction apartments offer residents the luxury of a private gated community.', '200 W Washington st', 'Dallas', '56556', true, false, CURRENT_DATE, 2,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/94565dbbf813f2fe9c2efdf976f9b401-cc_ft_960.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-09-01', 27),

    (600, 2, 'RENT', 'TRAILER', 'This cozy, top floor updated unit with lots of natural light. Balcony,new carpets,granite counters,newer appliances (stove,fridge,dishwasher, open concept, dinning room,eat in kitchen,) . Laundry Facility on Premises ,central air,,new carpets.', '1455 W 36th St #6', 'Fairfield', '52550', true, false, CURRENT_DATE, 2,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house3.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-08-30', 28),

    (230000, 4, 'SELL', 'HOUSE', 'Welcome to Grandview City Lights Spacious 3 bedroom apartment at Grandview City Lights in Los Angeles, experience great living in LOW-INCOME AFFORDABLE HOUSING.', '1219 W 25th St', 'Fairfield', '51551', false, true, CURRENT_DATE, 1,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/94565dbbf813f2fe9c2efdf976f9b401-cc_ft_960.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/ce901a2820ce401564cce39b31c3520f-cc_ft_960.jpg', '2022-08-29', 29),

    (230000, 4, 'SELL', 'HOUSE', 'Welcome to Fairfield City Liberty Park Apartment. It has 2 bedrooms, 1 restroom, 1 living room.', '2006 LibertyVille', 'Fairfield', '52556', false, true, CURRENT_DATE, 3,
     'https://waaproject-bucket.s3.us-west-1.amazonaws.com/house4.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/house4-1-1664509725.jpg;https://waaproject-bucket.s3.us-west-1.amazonaws.com/house4-3-1664509730.jpg', '2022-08-30', 30);

INSERT INTO favorite_properties_users(user_id, property_id)
VALUES
    (1,1),
    (1,2),
    (2,1),
    (2,3);
