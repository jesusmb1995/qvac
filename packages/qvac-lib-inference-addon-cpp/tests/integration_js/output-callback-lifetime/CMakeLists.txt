cmake_minimum_required(VERSION 3.25)

find_package(cmake-bare REQUIRED PATHS node_modules/cmake-bare)
find_package(cmake-vcpkg REQUIRED PATHS node_modules/cmake-vcpkg)

set(VCPKG_INSTALL_OPTIONS --clean-after-build)

project(
  output_callback_lifetime
  VERSION 0.1.0
  LANGUAGES C CXX)

find_path(VCPKG_INSTALLED_PATH share/qvac-lint-cpp/.clang-format REQUIRED)
configure_file(${VCPKG_INSTALLED_PATH}/share/qvac-lint-cpp/.clang-format
               ${CMAKE_CURRENT_SOURCE_DIR}/.clang-format COPYONLY)
configure_file(${VCPKG_INSTALLED_PATH}/share/qvac-lint-cpp/.clang-tidy
               ${CMAKE_CURRENT_SOURCE_DIR}/.clang-tidy COPYONLY)
configure_file(${VCPKG_INSTALLED_PATH}/share/qvac-lint-cpp/.valgrind.supp
               ${CMAKE_CURRENT_SOURCE_DIR}/.valgrind.supp COPYONLY)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)

add_bare_module(output_callback_lifetime EXPORTS)

target_sources(
  ${output_callback_lifetime}
  PRIVATE
  binding.cpp
)

target_include_directories(
  ${output_callback_lifetime}
  PRIVATE
  ../../../src
)

if(WIN32)
  target_compile_options(${output_callback_lifetime} PRIVATE "/utf-8")

  target_link_libraries(
    ${output_callback_lifetime}
    PRIVATE
    msvcrt.lib
  )
endif()
