// import { of } from 'rxjs';
// import { BlockService } from '../block/block.service';
// import { MobService } from '../mob/mob.service';
// import { ToolService } from '../tool/tool.service';
// import { User } from './user.model';
// import { UserService } from './user.service';

// const http = jasmine.createSpyObj('HttpClient', [
//   'read',
//   'create',
//   'update',
//   'delete',
//   'list',
// ]);
// const mobService = jasmine.createSpyObj('MobService', ['list']);
// const toolService = jasmine.createSpyObj('ToolService', ['list']);
// const blockService = jasmine.createSpyObj('BlockService', ['list']);
// const userService = new UserService(
//   http,
//   mobService,
//   toolService,
//   blockService
// );
// describe('UserService', () => {
//   it('should return a list of users', () => {
//     // Arrange
//     const users: User[] = [
//       {
//         _id: '1',
//         username: 'test',
//         email: 'test@gmail.com',
//         password: 'test',
//         about: 'test',
//         subscriptions: [],
//         subscribers: [],
//         liked: [],
//         disliked: [],
//       },
//     ];
//     const expected: User[] = [
//       {
//         _id: '1',
//         username: 'test',
//         email: 'test@gmail.com',
//         password: 'test',
//         about: 'test',
//         subscriptions: [],
//         subscribers: [],
//         liked: [],
//         disliked: [],
//       },
//     ];
//     spyOn(userService, 'list').and.returnValue(of(users));
//     // Act
//     userService.list().subscribe((users) => {
//       // Assert
//       expect(users).toEqual(expected);
//     });
//   });

//   it('should return a user', () => {
//     // Arrange
//     const user: User = {
//       _id: '1',
//       username: 'test',
//       email: 'test@gmail.com',
//       password: 'test',
//       about: 'test',
//       subscriptions: [],
//       subscribers: [],
//       liked: [],
//       disliked: [],
//     };
//     const expected: User = {
//       _id: '1',
//       username: 'test',
//       email: 'test@gmail.com',
//       password: 'test',
//       about: 'test',
//       subscriptions: [],
//       subscribers: [],
//       liked: [],
//       disliked: [],
//     };
//     spyOn(userService, 'read').and.returnValue(of(user));
//     // Act
//     userService.read('1').subscribe((user) => {
//       // Assert
//       expect(user).toEqual(expected);
//     });
//   });

//   it('should create a user', () => {
//     // Arrange
//     const user: User = {
//       _id: '1',
//       username: 'test',
//       email: 'test@gmail.com',
//       password: 'test',
//       about: 'test',
//       subscriptions: [],
//       subscribers: [],
//       liked: [],
//       disliked: [],
//     };
//     const expected: User = {
//       _id: '1',
//       username: 'test',
//       email: 'test@gmail.com',
//       password: 'test',
//       about: 'test',
//       subscriptions: [],
//       subscribers: [],
//       liked: [],
//       disliked: [],
//     };
//     spyOn(userService, 'create').and.returnValue(of(user));
//     // Act
//     userService.create(user).subscribe((user) => {
//       // Assert
//       expect(user).toEqual(expected);
//     });
//   });

//   it('should update a user', () => {
//     // Arrange
//     const user: User = {
//       _id: '1',
//       username: 'test',
//       email: 'test@gmail.com',
//       password: 'test',
//       about: 'test',
//       subscriptions: [],
//       subscribers: [],
//       liked: [],
//       disliked: [],
//     };
//     const expected: User = {
//       _id: '1',
//       username: 'test',
//       email: 'test@gmail.com',
//       password: 'test',
//       about: 'test',
//       subscriptions: [],
//       subscribers: [],
//       liked: [],
//       disliked: [],
//     };
//     spyOn(userService, 'update').and.returnValue(of(user));
//     // Act
//     userService.update(user).subscribe((user) => {
//       // Assert
//       expect(user).toEqual(expected);
//     });
//   });
// });
