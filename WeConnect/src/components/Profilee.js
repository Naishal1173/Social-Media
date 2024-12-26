import React from 'react';
// import {View} from 'react-native';

const Profilee =() => {

    return (
        <div class="container">
        <div class="row">
           <div class="col-sm-12">
              <div class="card">
                 <div class="card-body profile-page p-0">
                    <div class="profile-header">
                       <div class="position-relative">
                          <img src="../assets/images/page-img/profile-bg1.jpg" alt="profile-bg" class="rounded img-fluid" loading="lazy"/>
                          <ul class="header-nav list-inline d-flex flex-wrap justify-end p-0 m-0">
                             <li><a href="#" class="material-symbols-outlined">
                                edit
                                </a>
                             </li>
                          </ul>
                       </div>
                       <div class="user-detail text-center mb-3">
                          <div class="profile-img">
                             <img src="../assets/images/user/11.png" alt="profile-img" class="avatar-130 img-fluid" loading="lazy"/>
                          </div>
                          <div class="profile-detail">
                             <h3 class="">Bni Cyst</h3>
                          </div>
                       </div>
                       <div class="profile-info py-5 px-md-5 px-3 d-flex align-items-center justify-content-between position-relative">
                          <div class="social-links">
                             <ul class="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                                <li class="text-center pe-3">
                                   <a href="#"><img src="../assets/images/icon/08.png" class="img-fluid rounded" alt="facebook" loading="lazy"/></a>
                                </li>
                                <li class="text-center pe-3">
                                   <a href="#"><img src="../assets/images/icon/09.png" class="img-fluid rounded" alt="Twitter" loading="lazy"/></a>
                                </li>
                                <li class="text-center pe-3">
                                   <a href="#"><img src="../assets/images/icon/10.png" class="img-fluid rounded" alt="Instagram" loading="lazy"/></a>
                                </li>
                                <li class="text-center pe-3">
                                   <a href="#"><img src="../assets/images/icon/11.png" class="img-fluid rounded" alt="Google plus" loading="lazy"/></a>
                                </li>
                                <li class="text-center pe-3">
                                   <a href="#"><img src="../assets/images/icon/12.png" class="img-fluid rounded" alt="You tube" loading="lazy"/></a>
                                </li>
                                <li class="text-center md-pe-3 pe-0">
                                   <a href="#"><img src="../assets/images/icon/13.png" class="img-fluid rounded" alt="linkedin" loading="lazy"/></a>
                                </li>
                             </ul>
                          </div>
                          <div class="social-info">
                             <ul class="social-data-block social-user-meta-list d-flex align-items-center justify-content-center list-inline p-0 m-0 gap-1">
                                <li class="text-center">
                                   <p class="mb-0">690</p>
                                   <h6 class="mb-0">Posts</h6>
                                </li>
                                <li class="text-center">
                                   <p class="mb-0">206</p>
                                   <h6 class="mb-0">Followers</h6>
                                </li>
                                <li class="text-center">
                                   <p class="mb-0">100</p>
                                   <h6 class="mb-0">Following</h6>
                                </li>
                             </ul>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        <div class="row mt-1">
           <div class="col-md-4 col-lg-4">
              <div class="fixed-suggestion mb-4">
              <div class="card">
                 <div class="card-body p-0">
                    <div class="tab-bottom-bordered">
                       <ul class="mb-0 nav nav-tabs rounded-top border-0 d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                          <li class="nav-item col-12 col-sm-3 p-0">
                             <a class="nav-link border-0 active" href="#Posts" data-bs-toggle="pill" data-bs-target="#Posts" role="button">Posts</a>
                          </li>
                          <li class="nav-item col-12 col-sm-3 p-0">
                             <a class="nav-link border-0 px-md-0" href="#Abouts" data-bs-toggle="pill" data-bs-target="#Abouts" role="button">Abouts</a>
                          </li>
                          <li class="nav-item col-12 col-sm-3 p-0">
                             <a class="nav-link border-0 px-md-0" href="#Friends" data-bs-toggle="pill" data-bs-target="#Friends" role="button">Friends</a>
                          </li>
                          <li class="nav-item col-12 col-sm-3 p-0">
                             <a class="nav-link border-0 px-md-0" href="#Photos" data-bs-toggle="pill" data-bs-target="#Photos" role="button">Photos</a>
                          </li>
                       </ul>
                    </div>
                 </div>
              </div>
              <div class="tab-content">
                 <div class="tab-pane fade show active" id="Posts" role="tabpanel">
                    <div class="card">
                       <div class="card-header d-flex justify-content-between border-bottom">
                          <div class="header-title">
                             <h4 class="card-title">Intro</h4>
                          </div>
                       </div>
                       <div class="card-body">
                          <div class="d-flex align-items-center">
                             <span class="material-symbols-outlined">
                             watch_later
                             </span>
                             <span class="ms-2">Joined August 2012</span>
                          </div>
                          <div class="mt-2">
                             <div class="d-grid gap-2">
                                <button class="btn btn-primary" type="button">Edit Details</button>
                                <button class="btn btn-primary" type="button">Add Hobbies</button>
                                <button class="btn btn-primary" type="button">Add Featured</button>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div class="card">
                       <div class="card-header d-flex justify-content-between border-bottom">
                          <div class="header-title">
                             <h4 class="card-title">Life Event</h4>
                          </div>
                          <div class="card-header-toolbar d-flex align-items-center">
                             <p class="m-0"><a href="javacsript:void();"> Create </a></p>
                          </div>
                       </div>
                       <div class="card-body">
                          <div class="row">
                             <div class="col-sm-12">
                                <div class="event-post position-relative">
                                   <a href="#"><img src="../assets/images/page-img/07.jpg" alt="gallary-image" class="img-fluid rounded" loading="lazy"/></a>
                                   <div class="job-icon-position">
                                      <div class="job-icon bg-primary p-2 d-inline-block rounded-circle material-symbols-outlined text-white">
                                         local_mall
                                      </div>
                                   </div>
                                   <div class="card-body text-center p-2">
                                      <h5>Started New Job at Apple</h5>
                                      <p>January 24, 2019</p>
                                   </div>
                                </div>
                             </div>
                             <div class="col-sm-12">
                                <div class="event-post position-relative">
                                   <a href="#"><img src="../assets/images/page-img/06.jpg" alt="gallary-image" class="img-fluid rounded" loading="lazy"/></a>
                                   <div class="job-icon-position">
                                      <div class="job-icon bg-primary p-2 d-inline-block rounded-circle material-symbols-outlined text-white">
                                         local_mall
                                      </div>
                                   </div>
                                   <div class="card-body text-center p-2">
                                      <h5>Freelance Photographer</h5>
                                      <p class="mb-0">January 24, 2019</p>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div class="tab-pane fade" id="Photos" role="tabpanel">
                    <div class="card">
                       <div class="card-header d-flex justify-content-between border-bottom">
                          <div class="header-title">
                             <h4 class="card-title">Photos</h4>
                          </div>
                          <div class="card-header-toolbar d-flex align-items-center">
                             <p class="m-0"><a href="javacsript:void();">Add Photo </a></p>
                          </div>
                       </div>
                       <div class="card-body">
                          <ul class="profile-img-gallary p-0 m-0 list-unstyled">
                             <li class="">
                                <a data-fslightbox="gallery" href="../assets/images/page-img/g1.jpg">
                                <img src="../assets/images/page-img/g1.jpg" class="img-fluid" alt="photo-profile" loading="lazy"/>
                                </a>
                             </li>
                             <li class="">
                                <a data-fslightbox="gallery" href="../assets/images/page-img/g2.jpg">
                                <img src="../assets/images/page-img/g2.jpg" class="img-fluid" alt="photo-profile" loading="lazy"/>
                                </a>
                             </li>
                             <li class="">
                                <a data-fslightbox="gallery" href="../assets/images/page-img/g3.jpg">
                                <img src="../assets/images/page-img/g3.jpg" class="img-fluid" alt="photo-profile" loading="lazy"/>
                                </a>
                             </li>
                             <li class="">
                                <a data-fslightbox="gallery" href="../assets/images/page-img/g4.jpg">
                                <img src="../assets/images/page-img/g4.jpg" class="img-fluid" alt="photo-profile" loading="lazy"/>
                                </a>
                             </li>
                             <li class="">
                                <a data-fslightbox="gallery" href="../assets/images/page-img/g5.jpg">
                                <img src="../assets/images/page-img/g5.jpg" class="img-fluid" alt="photo-profile" loading="lazy"/>
                                </a>
                             </li>
                             <li class="">
                                <a data-fslightbox="gallery" href="../assets/images/page-img/g6.jpg">
                                <img src="../assets/images/page-img/g6.jpg" class="img-fluid" alt="photo-profile" loading="lazy"/>
                                </a>
                             </li>
                             <li class="">
                                <a data-fslightbox="gallery" href="../assets/images/page-img/g7.jpg">
                                <img src="../assets/images/page-img/g7.jpg" class="img-fluid" alt="photo-profile" loading="lazy"/>
                                </a>
                             </li>
                             <li class="">
                                <a data-fslightbox="gallery" href="../assets/images/page-img/g8.jpg">
                                <img src="../assets/images/page-img/g8.jpg" class="img-fluid" alt="photo-profile" loading="lazy"/>
                                </a>
                             </li>
                             <li class="">
                                <a data-fslightbox="gallery" href="../assets/images/page-img/g9.jpg">
                                <img src="../assets/images/page-img/g9.jpg" class="img-fluid" alt="photo-profile" loading="lazy"/>
                                </a>
                             </li>
                          </ul>
                       </div>
                    </div>
                 </div>
                 <div class="tab-pane fade" id="Abouts" role="tabpanel">
                    <div class="card">
                       <div class="card-body">
                          <h4>Contact Information</h4>
                          <hr/>
                          <div class="row">
                             <div class="col-3">
                                <h6>Email</h6>
                             </div>
                             <div class="col-9">
                                <a href="#" class="mb-0">Bnijohn@gmail.com</a>
                             </div>
                             <div class="col-3">
                                <h6>Mobile</h6>
                             </div>
                             <div class="col-9">
                                <p class="mb-0">(001) 4544 565 456</p>
                             </div>
                             <div class="col-3">
                                <h6>Address</h6>
                             </div>
                             <div class="col-9">
                                <p class="mb-0">United States of America</p>
                             </div>
                          </div>
                          <h4 class="mt-3">Websites and Social Links</h4>
                          <hr/>
                          <div class="row">
                             <div class="col-3">
                                <h6>Website</h6>
                             </div>
                             <div class="col-9">
                                <a href="#" class="mb-0">www.bootstrap.com</a>
                             </div>
                             <div class="col-3">
                                <h6>Social Link</h6>
                             </div>
                             <div class="col-9">
                                <a href="#" class="mb-0">www.bootstrap.com</a>
                             </div>
                          </div>
                          <h4 class="mt-3">Basic Information</h4>
                          <hr/>
                          <div class="row">
                             <div class="col-4">
                                <h6>Birth Date</h6>
                             </div>
                             <div class="col-8">
                                <p class="mb-0">24 January</p>
                             </div>
                             <div class="col-4">
                                <h6>Birth Year</h6>
                             </div>
                             <div class="col-8">
                                <p class="mb-0">1994</p>
                             </div>
                             <div class="col-4">
                                <h6>Gender</h6>
                             </div>
                             <div class="col-8">
                                <p class="mb-0">Female</p>
                             </div>
                             <div class="col-4">
                                <h6>interested in</h6>
                             </div>
                             <div class="col-8">
                                <p class="mb-0">Designing</p>
                             </div>
                             <div class="col-4">
                                <h6>language</h6>
                             </div>
                             <div class="col-8">
                                <p class="mb-0">English, French</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div class="tab-pane fade" id="Friends" role="tabpanel">
                    <div class="card">
                       <div class="card-body">
                          <ul class="request-list list-inline m-0 p-0">
                             <li class="d-flex align-items-center  flex-wrap">
                                <div class="user-img img-fluid flex-shrink-0">
                                   <img src="../assets/images/user/13.jpg" alt="story-img" class="rounded-circle avatar-40"/>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                   <h6>Paul Misunday</h6>
                                   <p class="mb-0">6  friends</p>
                                </div>
                                <div class="d-flex align-items-center mt-2 mt-md-0">
                                   <a href="#" class=" btn btn-primary rounded">Follow</a>
                                </div>
                             </li>
                             <li class="d-flex align-items-center  flex-wrap">
                                <div class="user-img img-fluid flex-shrink-0">
                                   <img src="../assets/images/user/14.jpg" alt="story-img" class="rounded-circle avatar-40"/>
                                </div>
                                <div class="flex-grow-1  ms-3">
                                   <h6>Reanne</h6>
                                   <p class="mb-0">12  friends</p>
                                </div>
                                <div class="d-flex align-items-center mt-2 mt-md-0">
                                   <a href="#" class=" btn btn-primary rounded">Follow</a>
                                </div>
                             </li>
                             <li class="d-flex align-items-center  flex-wrap">
                                <div class="user-img img-fluid flex-shrink-0">
                                   <img src="../assets/images/user/15.jpg" alt="story-img" class="rounded-circle avatar-40"/>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                   <h6>Reanne </h6>
                                   <p class="mb-0">12  friends</p>
                                </div>
                                <div class="d-flex align-items-center mt-2 mt-md-0">
                                   <a href="#" class=" btn btn-primary rounded">Follow</a>
                                </div>
                             </li>
                             <li class="d-flex align-items-center  flex-wrap">
                                <div class="user-img img-fluid flex-shrink-0">
                                   <img src="../assets/images/user/16.jpg" alt="story-img" class="rounded-circle avatar-40"/>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                   <h6>Reanne</h6>
                                   <p class="mb-0">12  friends</p>
                                </div>
                                <div class="d-flex align-items-center mt-2 mt-md-0">
                                   <a href="#" class=" btn btn-primary rounded">Follow</a>
                                </div>
                             </li>
                             <li class="d-flex align-items-center  flex-wrap">
                                <div class="user-img img-fluid flex-shrink-0">
                                   <img src="../assets/images/user/17.jpg" alt="story-img" class="rounded-circle avatar-40"/>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                   <h6>Reanne </h6>
                                   <p class="mb-0">15  friends</p>
                                </div>
                                <div class="d-flex align-items-center mt-2 mt-md-0">
                                   <a href="#" class=" btn btn-primary rounded">Follow</a>
                                </div>
                             </li>
                             <li class="d-flex align-items-center  flex-wrap mb-0">
                                <div class="user-img img-fluid flex-shrink-0">
                                   <img src="../assets/images/user/18.jpg" alt="story-img" class="rounded-circle avatar-40"/>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                   <h6>Reanne </h6>
                                   <p class="mb-0">21  friends</p>
                                </div>
                                <div class="d-flex align-items-center mt-2 mt-md-0">
                                   <a href="#" class=" btn btn-primary rounded">Follow</a>
                                </div>
                             </li>
                          </ul>
                       </div>
                    </div>
                 </div>
              </div>
              </div>
           </div>
           <div class="col-md-8 col-lg-8">
              <div id="post-modal-data" class="card">
                 <div class="card-header d-flex justify-content-between">
                    <div class="header-title">
                       <h4 class="card-title">Create Post</h4>
                    </div>
                 </div>
                 <div class="card-body">
                    <div class="d-flex align-items-center">
                       <div class="user-img">
                          <img src="../assets/images/user/1.jpg" alt="userimg" class="avatar-60 rounded-circle"/>
                       </div>
                       <form class="post-text ms-3 w-100 "  data-bs-toggle="modal" data-bs-target="#post-modal" action="#">
                          <input type="text" class="form-control rounded" placeholder="Write something here..." style={{border:'none'}}/>
                       </form>
                    </div>
                    <hr/>
                    <ul class=" post-opt-block d-flex list-inline m-0 p-0 flex-wrap gap-3">
                       <li class="bg-primary-subtle rounded p-2 pointer d-flex align-items-center"><img src="../assets/images/small/07.png" alt="icon" class="img-fluid me-2" loading="lazy"/> Photo/Video</li>
                       <li class="bg-primary-subtle rounded p-2 pointer d-flex align-items-center"><img src="../assets/images/small/08.png" alt="icon" class="img-fluid me-2" loading="lazy"/> Tag Friend</li>
                       <li class="bg-primary-subtle rounded p-2 pointer d-flex align-items-center"><img src="../assets/images/small/09.png" alt="icon" class="img-fluid me-2" loading="lazy"/> Feeling/Activity</li>
                       <li class="bg-primary-subtle rounded p-2 pointer text-center">
                          <div class="card-header-toolbar d-flex align-items-center">
                             <div class="dropdown">
                                <div class="dropdown-toggle lh-1" id="post-option"   data-bs-toggle="dropdown">
                                   <span class="material-symbols-outlined"> more_horiz</span>
                                </div>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="post-option" style={{}}>
                                   <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">Check in</a>
                                   <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">Live Video</a>
                                   <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">GIF</a>
                                   <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">Watch Party</a>
                                   <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#post-modal">Play with Friend</a>
                                </div>
                             </div>
                          </div>
                       </li>
                    </ul>
                 </div>
                 <div class="modal fade" id="post-modal" tabindex="-1"  aria-labelledby="post-modalLabel" aria-hidden="true" >
                    <div class="modal-dialog  modal-lg modal-fullscreen-sm-down">
                       <div class="modal-content">
                          <div class="modal-header">
                             <h5 class="modal-title" id="post-modalLabel">Create Post</h5>
                             <a href="javascript:void(0);" class="lh-1" data-bs-dismiss="modal">
                                <span class="material-symbols-outlined">close</span>
                             </a>
                          </div>
                          <div class="modal-body">
                             <div class="d-flex align-items-center">
                                <div class="user-img">
                                   <img src="../assets/images/user/1.jpg" alt="userimg" class="avatar-60 rounded-circle img-fluid" loading="lazy"/>
                                </div>
                                <form class="post-text ms-3 w-100" action="#">
                                   <input type="text" class="form-control rounded" placeholder="Write something here..." style={{border:'none'}}/>
                                </form>
                             </div>
                             <hr/>
                             <ul class="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                                <li class="col-md-6 mb-3">
                                   <div class="bg-primary-subtle rounded p-2 pointer me-3"><a href="#"></a><img src="../assets/images/small/07.png" alt="icon" class="img-fluid" loading="lazy"/> Photo/Video</div>
                                </li>
                                <li class="col-md-6 mb-3">
                                   <div class="bg-primary-subtle rounded p-2 pointer me-3"><a href="#"></a><img src="../assets/images/small/08.png" alt="icon" class="img-fluid" loading="lazy"/> Tag Friend</div>
                                </li>
                                <li class="col-md-6 mb-3">
                                   <div class="bg-primary-subtle rounded p-2 pointer me-3"><a href="#"></a><img src="../assets/images/small/09.png" alt="icon" class="img-fluid" loading="lazy"/> Feeling/Activity</div>
                                </li>
                                <li class="col-md-6 mb-3">
                                   <div class="bg-primary-subtle rounded p-2 pointer me-3"><a href="#"></a><img src="../assets/images/small/10.png" alt="icon" class="img-fluid" loading="lazy"/> Check in</div>
                                </li>
                                <li class="col-md-6 mb-3">
                                   <div class="bg-primary-subtle rounded p-2 pointer me-3"><a href="#"></a><img src="../assets/images/small/11.png" alt="icon" class="img-fluid" loading="lazy"/> Live Video</div>
                                </li>
                                <li class="col-md-6 mb-3">
                                   <div class="bg-primary-subtle rounded p-2 pointer me-3"><a href="#"></a><img src="../assets/images/small/12.png" alt="icon" class="img-fluid" loading="lazy"/> GIF</div>
                                </li>
                                <li class="col-md-6 mb-3">
                                   <div class="bg-primary-subtle rounded p-2 pointer me-3"><a href="#"></a><img src="../assets/images/small/13.png" alt="icon" class="img-fluid" loading="lazy"/> Watch Party</div>
                                </li>
                                <li class="col-md-6 mb-3">
                                   <div class="bg-primary-subtle rounded p-2 pointer me-3"><a href="#"></a><img src="../assets/images/small/14.png" alt="icon" class="img-fluid" loading="lazy"/> Play with Friends</div>
                                </li>
                             </ul>
                             <hr/>
                             <div class="other-option">
                                <div class="d-flex align-items-center justify-content-between">
                                   <div class="d-flex align-items-center">
                                      <div class="user-img me-3">
                                         <img src="../assets/images/user/1.jpg" alt="userimg" class="avatar-60 rounded-circle img-fluid" loading="lazy"/>
                                      </div>
                                      <h6>Your Story</h6>
                                   </div>
                                   <div class="card-post-toolbar">
                                      <div class="dropdown">
                                         <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                         <span class="btn btn-primary">Friend</span>
                                         </span>
                                         <div class="dropdown-menu m-0 p-0">
                                            <a class="dropdown-item p-3" href="#">
                                               <div class="d-flex align-items-top">
                                                  <span class="material-symbols-outlined">
                                                  save
                                                  </span>
                                                  <div class="data ms-2">
                                                     <h6>Public</h6>
                                                     <p class="mb-0">Anyone on or off Facebook</p>
                                                  </div>
                                               </div>
                                            </a>
                                            <a class="dropdown-item p-3" href="#">
                                               <div class="d-flex align-items-top">
                                                  <span class="material-symbols-outlined">
                                                  cancel
                                                  </span>
                                                  <div class="data ms-2">
                                                     <h6>Friends</h6>
                                                     <p class="mb-0">Your Friend on facebook</p>
                                                  </div>
                                               </div>
                                            </a>
                                            <a class="dropdown-item p-3" href="#">
                                               <div class="d-flex align-items-top">
                                                  <span class="material-symbols-outlined">
                                                  person_remove
                                                  </span>
                                                  <div class="data ms-2">
                                                     <h6>Friends except</h6>
                                                     <p class="mb-0">Don't show to some friends</p>
                                                  </div>
                                               </div>
                                            </a>
                                            <a class="dropdown-item p-3" href="#">
                                               <div class="d-flex align-items-top">
                                                  <span class="material-symbols-outlined">
                                                  notifications
                                                  </span>
                                                  <div class="data ms-2">
                                                     <h6>Only Me</h6>
                                                     <p class="mb-0">Only me</p>
                                                  </div>
                                               </div>
                                            </a>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                             </div>
                             <button type="submit" class="btn btn-primary d-block w-100 mt-3">Post</button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
              <div class="card">
                 <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between flex-wrap">
                       <h4>Posts</h4>
                       <div class="d-flex align-items-center">
                          <button type="button" class="btn btn-primary d-flex align-items-center">
                          <span class="material-symbols-outlined md-18">
                          tune
                          </span>
                          <span class="ms-2">Filters</span>
                          </button>
                          <button type="button" class="btn btn-primary ms-2 d-flex align-items-center">
                          <span class="material-symbols-outlined md-18">
                          settings
                          </span>
                          <span class="ms-2">Manages Posts</span>
                          </button>
                       </div>
                    </div>
                    <hr/>
                    <ul class="nav tab-nav-pane nav-tabs grid justify-content-evenly mb-0">
                       <li class="pb-0 mb-0 nav-item">
                          <a data-bs-toggle="tab" class="font-weight-bold text-uppercase nav-link active d-flex align-items-center" href="#Listview">
                          <span class="material-symbols-outlined md-18 me-1">
                          view_headline
                          </span>
                          List View
                          </a>
                       </li>
                       <li class="pb-0 mb-0 nav-item">
                          <a data-bs-toggle="tab" class="font-weight-bold text-uppercase ms-3  nav-link d-flex align-items-center" href="#Gridview">
                          <span class="material-symbols-outlined md-18 me-1 ">
                          grid_view
                          </span>
                          Grid View
                          </a>
                       </li>
                    </ul>
                    <div class="tab-content">
                       <div class="tab-pane fade show active" id="Listview" role="tabpanel">
                          <div class="">
                             <div class="card-header d-flex justify-content-between px-0">
                                <div class="header-title">
                                   <h4 class="card-title">Friend Request</h4>
                                </div>
                             </div>
                             <div class="card-body p-0 pt-3">
                                <ul class="request-list list-inline m-0 p-0">
                                   <li class="d-flex align-items-start align-items-md-center justify-content-between ">
                                      <div class="d-flex align-items-center">
                                         <div class="user-img img-fluid flex-shrink-0">
                                            <img src="../assets/images/user/05.jpg" alt="story-img" class="rounded-circle avatar-40" loading="lazy"/>
                                         </div>
                                         <div class="flex-grow-1 ms-3">
                                            <h6>Jaques Amole</h6>
                                            <p class="mb-0">40  friends</p>
                                         </div>
                                      </div>
                                      <div class="d-flex align-items-center mt-2 mt-md-0">
                                         <div class="confirm-click-btn">
                                            <a href="#" class="me-2 btn btn-primary-subtle rounded confirm-btn p-1 lh-1">
                                               <i class="material-symbols-outlined font-size-14">
                                                  add
                                               </i>
                                            </a>
                                            <a href="../app/profile.html" class="me-3 btn btn-primary rounded request-btn" style={{display: 'none'}}>View All</a>
                                         </div>
                                         <a href="#" class="btn btn-danger-subtle rounded p-1 lh-1" data-extra-toggle="delete" data-closest-elem=".item">
                                            <i class="material-symbols-outlined font-size-14">
                                               close
                                            </i>
                                         </a>
                                      </div>
                                   </li>
                                   <li class="d-flex align-items-start align-items-md-center justify-content-between ">
                                      <div class="d-flex align-items-center">
                                         <div class="user-img img-fluid flex-shrink-0">
                                            <img src="../assets/images/user/06.jpg" alt="story-img" class="rounded-circle avatar-40" loading="lazy"/>
                                         </div>
                                         <div class="flex-grow-1 ms-3">
                                            <h6>Lucy Tania</h6>
                                            <p class="mb-0">12  friends</p>
                                         </div>
                                      </div>
                                      <div class="d-flex align-items-center mt-2 mt-md-0">
                                         <div class="confirm-click-btn">
                                            <a href="#" class="me-2 btn btn-primary-subtle rounded confirm-btn p-1 lh-1">
                                               <i class="material-symbols-outlined font-size-14">
                                                  add
                                               </i>
                                            </a>
                                            <a href="../app/profile.html" class="me-3 btn btn-primary rounded request-btn" style={{display: 'none'}}>View All</a>
                                         </div>
                                         <a href="#" class="btn btn-danger-subtle rounded p-1 lh-1" data-extra-toggle="delete" data-closest-elem=".item">
                                            <i class="material-symbols-outlined font-size-14">
                                               close
                                            </i>
                                         </a>                                    
                                      </div>
                                   </li>
                                   <li class="d-flex align-items-start align-items-md-center justify-content-between ">
                                      <div class="d-flex align-items-center">
                                         <div class="user-img img-fluid flex-shrink-0">
                                            <img src="../assets/images/user/07.jpg" alt="story-img" class="rounded-circle avatar-40" loading="lazy"/>
                                         </div>
                                         <div class="flex-grow-1 ms-3">
                                            <h6>Val Adictorian</h6>
                                            <p class="mb-0">0  friends</p>
                                         </div>
                                      </div>
                                     <div class="d-flex align-items-center mt-2 mt-md-0">
                                         <div class="confirm-click-btn">
                                            <a href="#" class="me-2 btn btn-primary-subtle rounded confirm-btn p-1 lh-1">
                                               <i class="material-symbols-outlined font-size-14">
                                                  add
                                               </i>
                                            </a>
                                            <a href="../app/profile.html" class="me-3 btn btn-primary rounded request-btn" style={{display: 'none'}} >View All</a>
                                         </div>
                                         <a href="#" class="btn btn-danger-subtle rounded p-1 lh-1" data-extra-toggle="delete" data-closest-elem=".item">
                                            <i class="material-symbols-outlined font-size-14">
                                               close
                                            </i>
                                         </a>                                   
                                      </div>
                                   </li>
                                   <li class="d-flex align-items-start align-items-md-center justify-content-between ">
                                      <div class="d-flex align-items-center">
                                         <div class="user-img img-fluid flex-shrink-0">
                                            <img src="../assets/images/user/08.jpg" alt="story-img" class="rounded-circle avatar-40" loading="lazy"/>
                                         </div>
                                         <div class="flex-grow-1 ms-3">
                                            <h6>Manny Petty</h6>
                                            <p class="mb-0">3  friends</p>
                                         </div>
                                      </div>
                                      <div class="d-flex align-items-center mt-2 mt-md-0">
                                         <a href="#" class="me-2 btn btn-primary-subtle rounded confirm-btn p-1 lh-1">
                                            <i class="material-symbols-outlined font-size-14">
                                               add
                                            </i>
                                         </a>
                                         <a href="#" class="btn btn-danger-subtle rounded p-1 lh-1" data-extra-toggle="delete" data-closest-elem=".item">
                                            <i class="material-symbols-outlined font-size-14">
                                               close
                                            </i>
                                         </a>                                   
                                      </div>
                                   </li>
                                   <li class="d-flex align-items-start align-items-md-center justify-content-between ">
                                      <div class="d-flex align-items-center">
                                         <div class="user-img img-fluid flex-shrink-0">
                                            <img src="../assets/images/user/09.jpg" alt="story-img" class="rounded-circle avatar-40" loading="lazy"/>
                                         </div>
                                         <div class="flex-grow-1 ms-3">
                                            <h6>Marsha Mello</h6>
                                            <p class="mb-0">15  friends</p>
                                         </div>
                                      </div>
                                      <div class="d-flex align-items-center mt-2 mt-md-0">
                                         <a href="#" class="me-2 btn btn-primary-subtle rounded confirm-btn p-1 lh-1">
                                            <i class="material-symbols-outlined font-size-14">
                                               add
                                            </i>
                                         </a>
                                         <a href="#" class="btn btn-danger-subtle rounded p-1 lh-1" data-extra-toggle="delete" data-closest-elem=".item">
                                            <i class="material-symbols-outlined font-size-14">
                                               close
                                            </i>
                                         </a>                                   
                                      </div>
                                   </li>
                                   <li class="d-flex align-items-start align-items-md-center justify-content-between ">
                                      <div class="d-flex align-items-center">
                                         <div class="user-img img-fluid flex-shrink-0">
                                            <img src="../assets/images/user/10.jpg" alt="story-img" class="rounded-circle avatar-40" loading="lazy"/>
                                         </div>
                                         <div class="flex-grow-1 ms-3">
                                            <h6>Caire Innet</h6>
                                            <p class="mb-0">8  friends</p>
                                         </div>
                                      </div>
                                      <div class="d-flex align-items-center mt-2 mt-md-0">
                                         <a href="#" class="me-2 btn btn-primary-subtle rounded confirm-btn p-1 lh-1">
                                            <i class="material-symbols-outlined font-size-14">
                                               add
                                            </i>
                                         </a>
                                         <a href="#" class="btn btn-danger-subtle rounded p-1 lh-1" data-extra-toggle="delete" data-closest-elem=".item">
                                            <i class="material-symbols-outlined font-size-14">
                                               close
                                            </i>
                                         </a>                                   
                                      </div>
                                   </li>
                                   <li class="d-flex align-items-start align-items-md-center justify-content-between ">
                                      <div class="d-flex align-items-center">
                                         <div class="user-img img-fluid flex-shrink-0">
                                            <img src="../assets/images/user/11.jpg" alt="story-img" class="rounded-circle avatar-40" loading="lazy"/>
                                         </div>
                                         <div class="flex-grow-1 ms-3">
                                            <h6>Gio Metric</h6>
                                            <p class="mb-0">10  friends</p>
                                         </div>
                                      </div>
                                      <div class="d-flex align-items-center mt-2 mt-md-0">
                                         <a href="#" class="me-2 btn btn-primary-subtle rounded confirm-btn p-1 lh-1">
                                            <i class="material-symbols-outlined font-size-14">
                                               add
                                            </i>
                                         </a>
                                         <a href="#" class="btn btn-danger-subtle rounded p-1 lh-1" data-extra-toggle="delete" data-closest-elem=".item">
                                            <i class="material-symbols-outlined font-size-14">
                                               close
                                            </i>
                                         </a>                                   
                                      </div>
                                   </li>
                                   <li class="d-flex align-items-start align-items-md-center justify-content-between ">
                                      <div class="d-flex align-items-center">
                                         <div class="user-img img-fluid flex-shrink-0">
                                            <img src="../assets/images/user/12.jpg" alt="story-img" class="rounded-circle avatar-40" loading="lazy"/>
                                         </div>
                                         <div class="flex-grow-1 ms-3">
                                            <h6>Chris P. Cream</h6>
                                            <p class="mb-0">18  friends</p>
                                         </div>
                                      </div>
                                      <div class="d-flex align-items-center mt-2 mt-md-0">
                                         <a href="#" class="me-2 btn btn-primary-subtle rounded confirm-btn p-1 lh-1">
                                            <i class="material-symbols-outlined font-size-14">
                                               add
                                            </i>
                                         </a>
                                         <a href="#" class="btn btn-danger-subtle rounded p-1 lh-1" data-extra-toggle="delete" data-closest-elem=".item">
                                            <i class="material-symbols-outlined font-size-14">
                                               close
                                            </i>
                                         </a>                                   
                                      </div>
                                   </li>
                                   <li class="d-flex align-items-start align-items-md-center justify-content-between ">
                                      <div class="d-flex align-items-center">
                                         <div class="user-img img-fluid flex-shrink-0">
                                            <img src="../assets/images/user/13.jpg" alt="story-img" class="rounded-circle avatar-40" loading="lazy"/>
                                         </div>
                                         <div class="flex-grow-1 ms-3">
                                            <h6>Paul Misunday</h6>
                                            <p class="mb-0">6  friends</p>
                                         </div>
                                      </div>
                                      <div class="d-flex align-items-center mt-2 mt-md-0">
                                         <a href="#" class="me-2 btn btn-primary-subtle rounded confirm-btn p-1 lh-1">
                                            <i class="material-symbols-outlined font-size-14">
                                               add
                                            </i>
                                         </a>
                                         <a href="#" class="btn btn-danger-subtle rounded p-1 lh-1" data-extra-toggle="delete" data-closest-elem=".item">
                                            <i class="material-symbols-outlined font-size-14">
                                               close
                                            </i>
                                         </a>                                   
                                      </div>
                                   </li>
                                   <li class="d-flex align-items-start align-items-md-center justify-content-between ">
                                      <div class="d-flex align-items-center">
                                         <div class="user-img img-fluid flex-shrink-0">
                                            <img src="../assets/images/user/14.jpg" alt="story-img" class="rounded-circle avatar-40" loading="lazy"/>
                                         </div>
                                         <div class="flex-grow-1 ms-3">
                                            <h6>Reanne </h6>
                                            <p class="mb-0">12  friends</p>
                                         </div>
                                      </div>
                                      <div class="d-flex align-items-center mt-2 mt-md-0">
                                         <a href="#" class="me-2 btn btn-primary-subtle rounded confirm-btn p-1 lh-1">
                                            <i class="material-symbols-outlined font-size-14">
                                               add
                                            </i>
                                         </a>
                                         <a href="#" class="btn btn-danger-subtle rounded p-1 lh-1" data-extra-toggle="delete" data-closest-elem=".item">
                                            <i class="material-symbols-outlined font-size-14">
                                               close
                                            </i>
                                         </a>                                   
                                      </div>
                                   </li>
                                   <li class="d-block text-center mb-0 pb-0">
                                      <a href="#" class="me-3 btn">View More Request</a>
                                   </li>
                                </ul>
                             </div>
                          </div>
                       </div>
                       <div class="tab-pane fade" id="Gridview" role="tabpanel">
                          <div class="row pt-3">
                             <div class="col-lg-6 col-md-6 mt-5">
                                <div class="card">
                                   <div class="card-body">
                                      <div class="iq-badges text-left">
                                         <div class="badges-icon">
                                            <img class="avatar-80 rounded" src="../assets/images/badges/01.png" alt="" loading="lazy"/>
                                         </div>
                                         <h5 class="mb-2">Gold User</h5>
                                         <p>Richard McClintock, a Latin professor consectetur.</p>
                                         <span class="text-uppercase">Unlock Jan 15th, 2020</span>
                                      </div>
                                   </div>
                                </div>
                             </div>
                             <div class="col-lg-6 col-md-6 mt-5">
                                <div class="card">
                                   <div class="card-body">
                                      <div class="iq-badges text-left">
                                         <div class="badges-icon">
                                            <img class="avatar-80 rounded" src="../assets/images/badges/02.png" alt="" loading="lazy"/>
                                         </div>
                                         <h5 class="mb-2">Gold User</h5>
                                         <p>Richard McClintock, a Latin professor consectetur.</p>
                                         <span class="text-uppercase">Unlock Jan 15th, 2020</span>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
              <div class="card">
                 <div class="card-body">
                    <div class="d-flex  justify-content-between">
                       <div class="me-3">
                          <div class="iq-profile-avatar status-online">
                             <img class="rounded-circle avatar-50" src="../assets/images/user/03.jpg" alt="" loading="lazy"/>
                          </div>
                       </div>
                       <div class="w-100">
                          <div class="d-flex justify-content-between">
                             <div class="">
                                <h5 class="mb-0 d-inline-block me-1"><a href="#" class="">Bni Cyst</a></h5>
                                <p class="mb-0 d-inline-block">Share Anna Mull's Post</p>
                                <p class="mb-0">5 hour ago</p>
                             </div>
                             <div class="card-post-toolbar">
                                <div class="dropdown">
                                   <span class="dropdown-toggle material-symbols-outlined" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                   more_horiz
                                   </span>
                                   <div class="dropdown-menu m-0 p-0">
                                      <a class="dropdown-item p-3" href="javascript:void(0);">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            save
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Save Post</h6>
                                               <p class="mb-0">Add this to your saved items</p>
                                            </div>
                                         </div>
                                      </a>
                                      <a class="dropdown-item p-3" href="javascript:void(0);">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            edit
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Edit Post</h6>
                                               <p class="mb-0">Update your post and saved items</p>
                                            </div>
                                         </div>
                                      </a>
                                      <a class="dropdown-item p-3" href="javascript:void(0);">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            cancel
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Hide From Timeline</h6>
                                               <p class="mb-0">See fewer posts like this.</p>
                                            </div>
                                         </div>
                                      </a>
                                      <a class="dropdown-item p-3" href="javascript:void(0);">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            delete
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Delete</h6>
                                               <p class="mb-0">Remove thids Post on Timeline</p>
                                            </div>
                                         </div>
                                      </a>
                                      <a class="dropdown-item p-3" href="#">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            notifications
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Notifications</h6>
                                               <p class="mb-0">Turn on notifications for this post</p>
                                            </div>
                                         </div>
                                      </a>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div class="user-post mt-2">
                       <a data-fslightbox="post" href="../assets/images/page-img/p3.jpg" class="rounded">
                          <img src="../assets/images/page-img/p3.jpg" alt="post-image"
                             class="img-fluid w-100" loading="lazy"/>
                       </a>
                    </div>
                 </div>
              </div>
              <div class="card">
                 <div class="card-body">
                    <div class="d-flex  justify-content-between">
                       <div class="me-3">
                          <div class="iq-profile-avatar status-online">
                             <img class="rounded-circle avatar-50" src="../assets/images/user/03.jpg" alt="" loading="lazy"/>
                          </div>
                       </div>
                       <div class="w-100">
                          <div class="d-flex justify-content-between">
                             <div class="">
                                <h5 class="mb-0 d-inline-block me-1"><a href="#" class="">Bni Cyst</a></h5>
                                <p class="mb-0 d-inline-block">Share Anna Mull's Post</p>
                                <p class="mb-0">5 hour ago</p>
                             </div>
                             <div class="card-post-toolbar">
                                <div class="dropdown">
                                   <span class="dropdown-toggle material-symbols-outlined" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                   more_horiz
                                   </span>
                                   <div class="dropdown-menu m-0 p-0">
                                      <a class="dropdown-item p-3" href="javascript:void(0);">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            save
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Save Post</h6>
                                               <p class="mb-0">Add this to your saved items</p>
                                            </div>
                                         </div>
                                      </a>
                                      <a class="dropdown-item p-3" href="javascript:void(0);">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            edit
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Edit Post</h6>
                                               <p class="mb-0">Update your post and saved items</p>
                                            </div>
                                         </div>
                                      </a>
                                      <a class="dropdown-item p-3" href="javascript:void(0);">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            cancel
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Hide From Timeline</h6>
                                               <p class="mb-0">See fewer posts like this.</p>
                                            </div>
                                         </div>
                                      </a>
                                      <a class="dropdown-item p-3" href="javascript:void(0);">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            delete
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Delete</h6>
                                               <p class="mb-0">Remove thids Post on Timeline</p>
                                            </div>
                                         </div>
                                      </a>
                                      <a class="dropdown-item p-3" href="javascript:void(0);">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            notifications
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Notifications</h6>
                                               <p class="mb-0">Turn on notifications for this post</p>
                                            </div>
                                         </div>
                                      </a>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div class="user-post mt-2">
                       <a data-fslightbox="post-2" href="../assets/images/page-img/fun.jpg" class="rounded">
                          <img src="../assets/images/page-img/fun.jpg" alt="post-image"
                             class="img-fluid w-100" loading="lazy"/>
                       </a>
                    </div>
                 </div>
              </div>
              <div class="card">
                 <div class="card-body">
                    <div class="d-flex  justify-content-between">
                       <div class="me-3">
                          <div class="iq-profile-avatar status-online">
                             <img class="rounded-circle avatar-50" src="../assets/images/user/03.jpg" alt="" loading="lazy"/>
                          </div>
                       </div>
                       <div class="w-100">
                          <div class="d-flex justify-content-between">
                             <div class="">
                                <h5 class="mb-0 d-inline-block me-1"><a href="#" class="">Bni Cyst</a></h5>
                                <p class="mb-0 d-inline-block">Share Anna Mull's Post</p>
                                <p class="mb-0">5 hour ago</p>
                             </div>
                             <div class="card-post-toolbar">
                                <div class="dropdown">
                                   <span class="dropdown-toggle material-symbols-outlined" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                   more_horiz
                                   </span>
                                   <div class="dropdown-menu m-0 p-0">
                                      <a class="dropdown-item p-3" href="javascript:void(0);">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            save
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Save Post</h6>
                                               <p class="mb-0">Add this to your saved items</p>
                                            </div>
                                         </div>
                                      </a>
                                      <a class="dropdown-item p-3" href="javascript:void(0);">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            edit
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Edit Post</h6>
                                               <p class="mb-0">Update your post and saved items</p>
                                            </div>
                                         </div>
                                      </a>
                                      <a class="dropdown-item p-3" href="javascript:void(0);">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            cancel
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Hide From Timeline</h6>
                                               <p class="mb-0">See fewer posts like this.</p>
                                            </div>
                                         </div>
                                      </a>
                                      <a class="dropdown-item p-3" href="javascript:void(0);">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            delete
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Delete</h6>
                                               <p class="mb-0">Remove thids Post on Timeline</p>
                                            </div>
                                         </div>
                                      </a>
                                      <a class="dropdown-item p-3" href="javascript:void(0);">
                                         <div class="d-flex align-items-top">
                                            <span class="material-symbols-outlined">
                                            notifications
                                            </span>
                                            <div class="data ms-2">
                                               <h6>Notifications</h6>
                                               <p class="mb-0">Turn on notifications for this post</p>
                                            </div>
                                         </div>
                                      </a>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div class="user-post mt-2">
                       <a data-fslightbox="post-3" href="../assets/images/page-img/p1.jpg" class="rounded">
                          <img src="../assets/images/page-img/p1.jpg" alt="post-image"
                             class="img-fluid w-100" loading="lazy"/>
                       </a>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </div>
    );
};

export default Profilee;
