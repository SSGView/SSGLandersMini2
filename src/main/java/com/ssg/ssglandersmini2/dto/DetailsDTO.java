package com.ssg.ssglandersmini2.dto;


import lombok.*;

import java.sql.Blob;
import java.time.LocalDate;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DetailsDTO {
    private long oid;
    private Long wid;
    private String name;
    private long quantity;
    private String warehousetype;
    private String firstcategory;
    private String secondcategory;
    private String thirdcategory;
    private String destination;//
    private LocalDate date;//
    private String sname;//
    private String approval;//
}
