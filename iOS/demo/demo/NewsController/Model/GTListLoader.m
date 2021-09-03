//
//  GTListLoader.m
//  demo
//
//  Created by teren yeung on 2021/5/20.
//

#import "GTListLoader.h"
#import <AFNetworking.h>

@implementation GTListLoader
- (void)loadListData {
    //    [self rawRequest];
}

- (void)rawRequest {
    NSString *url = @"https://baidu.com";
    NSURL *listURL = [NSURL URLWithString:url];
    NSURLRequest *listRequest = [NSURLRequest requestWithURL:listURL];
    NSURLSession *session = [NSURLSession sharedSession];
    //    NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:listRequest];
    NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:listRequest completionHandler:^(
            NSData *_Nullable data, NSURLResponse *_Nullable response, NSError *_Nullable error
    ) {
        NSLog(@"request");
        NSError *jsonError;
        id jsonObj = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
        
    }];
    [dataTask resume];
}

- (void)afRequest {
    [[AFHTTPSessionManager manager] GET:@"http://baidu.com" parameters:nil headers:nil progress:^(NSProgress *_Nullable downloadProgress) {

    }                           success:^(NSURLSessionDataTask *_Nonnull task, id _Nullable resonseObject) {

    }                           failure:^(NSURLSessionDataTask *_Nullable task, NSError *_Nullable error) {

    }];
}
@end
