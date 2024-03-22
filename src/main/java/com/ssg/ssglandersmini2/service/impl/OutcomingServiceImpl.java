package com.ssg.ssglandersmini2.service.impl;


import com.ssg.ssglandersmini2.domain.*;
import com.ssg.ssglandersmini2.dto.DetailsDTO;
import com.ssg.ssglandersmini2.dto.OutcomingListDTO;
import com.ssg.ssglandersmini2.dto.PageRequestDTO;
import com.ssg.ssglandersmini2.dto.PageResponseDTO;
import com.ssg.ssglandersmini2.mappers.OutcomingMapper;
import com.ssg.ssglandersmini2.service.interfaces.OutcomingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class OutcomingServiceImpl implements OutcomingService {

    private final OutcomingMapper outcomingMapper;
    private final ModelMapper modelMapper;

    @Override
    public PageResponseDTO<OutcomingListDTO> getList(PageRequestDTO pageRequestDTO) {

        // outcoming 리스트
        List<Outcoming> voList = outcomingMapper.selectOutcomingList(pageRequestDTO);

        // dto리스트에 outcoming 내용 넣음
        List<OutcomingListDTO> dtoList = voList.stream()
                .map(vo -> modelMapper.map(vo, OutcomingListDTO.class))
                .collect(Collectors.toList());

        // dto리스트에 상품 name 내용 넣음
        dtoList.forEach(dto -> dto.setName(outcomingMapper.getProductNameByPid(dto.getPid())));

        // dto리스트에 wid 이용해서 창고 이름 가져오기
        dtoList.forEach(dto -> dto.setWarehousetype(outcomingMapper.getWarehouseTypeByWid(dto.getWid())));

        // dto리스트에 wid, pid 이용해서 수량 가져오기 xx 잘못함
//        dtoList.forEach(dto -> dto.setQuantity(outcomingMapper.getStockQuantityByWidAndPid(dto.getWid(),dto.getPid())));

        int total = outcomingMapper.getCount(pageRequestDTO);


        PageResponseDTO<OutcomingListDTO> pageResponseDTO = PageResponseDTO.<OutcomingListDTO>withAll()
                .dtoList(dtoList)
                .total(total)
                .pageRequestDTO(pageRequestDTO)
                .build();
        return pageResponseDTO;
    }

    @Override
    public DetailsDTO getDetails(long oid){

        Outcoming outcoming = outcomingMapper.getOutcomingByOid(oid);
        DetailsDTO detailsDTO = modelMapper.map(outcoming, DetailsDTO.class);


        if(outcoming.getApproval().equals("승인완료")){
            Product product = outcomingMapper.getProductByOid(oid);
            Warehouse warehouse = outcomingMapper.getWarehouseByOid(oid);
            Waybill waybill = outcomingMapper.getWaybillByOid(oid);
            Shippingcompany shippingcompany = outcomingMapper.getShippingcompanyByWbid(waybill.getWbid());


            modelMapper.map(product,detailsDTO);
            modelMapper.map(warehouse,detailsDTO);
            modelMapper.map(waybill,detailsDTO);
            modelMapper.map(shippingcompany,detailsDTO);
        }
        else{
            Product product = outcomingMapper.getProductByOid(oid);
            Warehouse warehouse = outcomingMapper.getWarehouseByOid(oid);

            modelMapper.map(product,detailsDTO);
            modelMapper.map(warehouse,detailsDTO);
            detailsDTO.setDestination("미등록");
            detailsDTO.setDate(null);
            detailsDTO.setSname("미등록");
            detailsDTO.setQr(null);
            detailsDTO.setApproval("승인대기");
        }



        return detailsDTO;
    }


}