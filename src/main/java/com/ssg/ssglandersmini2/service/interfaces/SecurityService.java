package com.ssg.ssglandersmini2.service.interfaces;

import com.ssg.ssglandersmini2.domain.User;
import com.ssg.ssglandersmini2.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



public interface SecurityService {

    UserDTO register(UserDTO userDTO); // 사용자 등록

    String findUserIdByNameAndPhone(String name, String phone); // 사용자 아이디 찾기

    User getOne(String username); // 사용자 조회

    void modify(UserDTO userDTO); // 사용자 수정
    void remove(String username); // 사용자 삭제

    boolean checkUserExists(String username, String telnum); // 임시 비밀번호 찾기
    String resetUserPassword(String username);

    void deleteUserByUsername(String username);

    void updateAdmin(UserDTO userDTO);
    UserDTO getUserByUsername(String username);
}

